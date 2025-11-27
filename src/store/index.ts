import AsyncStorage from "@react-native-async-storage/async-storage";

type Listener = (value: any) => void;

const listeners = new Map<string, Set<Listener>>();

//------------------------------- STORE FUNCTIONS -------------------------------
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

//------------------------------- AUTH FUNCTIONS -------------------------------
export async function signInUser(name: string, email: string) {
  await setStore("userInfo", { isLoggedIn: true, name, email });
}
export async function signOutUser() {
  // Remove only the auth info and notify listeners so they react to logout.
  await AsyncStorage.removeItem("userInfo");
  notify("userInfo", { isLoggedIn: false });
}

//------------------------------- AUX FUNCTIONS --------------------------------
export function notify(name: string, value: any) {
  const callbacks = listeners.get(name);
  callbacks?.forEach((cb) => cb(value));
}
export async function getAbbreviatedName() {
  const userInfo = await getStore<{ name?: string }>("userInfo");
  const firstName = userInfo?.name ?? "";
  const lastName = firstName.split(" ").slice(-1)[0] || "";

  const abbreviatedName = `${firstName.charAt(0)}${lastName.charAt(
    0
  )}`.toUpperCase();

  return abbreviatedName;
}

//------------------------------- CLEAR FUNCTIONS -------------------------------
export async function clearStore() {
  await AsyncStorage.clear();
}

export function subscribe(isLoggedIn: string, listener: Listener) {
  const callbacks = listeners.get(isLoggedIn) ?? new Set<Listener>();
  callbacks.add(listener);
  listeners.set(isLoggedIn, callbacks);

  return () => {
    callbacks.delete(listener);
    if (!callbacks.size) {
      listeners.delete(isLoggedIn);
    }
  };
}

export const store = {
  setStore,
  getStore,
  subscribe,
};
