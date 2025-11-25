import AsyncStorage from "@react-native-async-storage/async-storage";

type Listener = (value: any) => void;

const listeners = new Map<string, Set<Listener>>();

function notify(name: string, value: any) {
  const callbacks = listeners.get(name);
  callbacks?.forEach((cb) => cb(value));
}

export async function setStore(name: string, value: any) {
  await AsyncStorage.setItem(name, JSON.stringify(value));
  notify(name, value);
}

export async function getStore<T = any>(name: string): Promise<T | null> {
  const value = await AsyncStorage.getItem(name);
  if (!value) return null;

  try {
    return JSON.parse(value) as T;
  } catch (error) {
    console.warn(`Failed to parse store value for ${name}`, error);
    return null;
  }
}

export function subscribe(name: string, listener: Listener) {
  const callbacks = listeners.get(name) ?? new Set<Listener>();
  callbacks.add(listener);
  listeners.set(name, callbacks);

  return () => {
    callbacks.delete(listener);
    if (!callbacks.size) {
      listeners.delete(name);
    }
  };
}

export const store = {
  setStore,
  getStore,
  subscribe,
};
