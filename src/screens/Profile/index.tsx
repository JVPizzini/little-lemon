import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import Checkbox from "react-native-bouncy-checkbox";

import * as ImagePicker from "expo-image-picker";
import {
  getAbbreviatedName,
  getStore,
  setStore,
  signOutUser,
} from "../../store";

export function Profile() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [image, setImage] = React.useState<string | null>(null);
  const [abbreviatedName, setAbbreviatedName] = React.useState("");

  const [orderStatuses, setOrderStatuses] = React.useState(false);
  const [passwordChange, setPasswordChange] = React.useState(false);
  const [specialOffers, setSpecialOffers] = React.useState(false);
  const [newsLetter, setNewsLetter] = React.useState(false);
  const [loadingImagePicker, setLoadingImagePicker] = React.useState(false);

  const checkboxList = [
    { title: "Order Statuses", value: orderStatuses, setter: setOrderStatuses },
    {
      title: "Password Change",
      value: passwordChange,
      setter: setPasswordChange,
    },
    { title: "Special Offers", value: specialOffers, setter: setSpecialOffers },
    { title: "Newsletter", value: newsLetter, setter: setNewsLetter },
  ];

  const inputList = [
    { title: "First Name", value: firstName, setter: setFirstName },
    { title: "Last Name", value: lastName, setter: setLastName },
    { title: "Email", value: email, setter: setEmail },
    { title: "Phone", value: phone, setter: setPhone },
  ];

  // handlers
  const handlePickImage = React.useCallback(async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Permission to access the media library is required."
      );
      return;
    }
    setLoadingImagePicker(true);

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images", "videos"],
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.log("Erro no ImagePicker", err);
    } finally {
      setLoadingImagePicker(false);
    }
  }, []);

  const handleSignOut = React.useCallback(() => {
    // Implement logout functionality here
    signOutUser();
  }, []);

  const handleSaveProfile = React.useCallback(async () => {
    const payload = {
      isLoggedIn: true, // keep user authenticated
      name: `${firstName} ${lastName}`.trim(),
      email,
      phone,
      image,
      preferences: {
        orderStatuses,
        passwordChange,
        specialOffers,
        newsLetter,
      },
    };

    await setStore("userInfo", payload);
    Alert.alert("Profile", "Changes saved successfully.");
  }, [
    email,
    firstName,
    image,
    lastName,
    newsLetter,
    orderStatuses,
    passwordChange,
    phone,
    specialOffers,
  ]);

  const handleResetProfile = React.useCallback(async () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setImage(null);
    setOrderStatuses(false);
    setPasswordChange(false);
    setSpecialOffers(false);
    setNewsLetter(false);

    await setStore("userInfo", {
      isLoggedIn: true,
      name: "",
      email: "",
      phone: "",
      image: null,
      preferences: {
        orderStatuses: false,
        passwordChange: false,
        specialOffers: false,
        newsLetter: false,
      },
    });
  }, []);

  React.useEffect(() => {
    const loadInfo = async () => {
      const abbreviatedName = await getAbbreviatedName();
      const userInfo = await getStore("userInfo");
      setFirstName(userInfo?.name || "");
      setEmail(userInfo?.email || "");

      setAbbreviatedName(abbreviatedName === "" ? "JV" : abbreviatedName);
    };

    loadInfo();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HeaderProfile
        image={image}
        // name={abbreviatedName}

        onPickImage={handlePickImage}
        loadingImagePicker={loadingImagePicker}
      />
      {formProfile(inputList, checkboxList)}
      {footerProfile(handleSignOut, handleResetProfile, handleSaveProfile)}
    </ScrollView>
  );
}

//////////////////////////////// COMPONENTS ////////////////////////////////
//------ HEADER
function HeaderProfile({
  image,

  onPickImage,
  loadingImagePicker,
}: {
  image: string | null;

  onPickImage: () => void;
  loadingImagePicker: boolean;
}) {
  const [abbreviatedName, setAbbreviatedName] = React.useState("");
  React.useEffect(() => {
    const loadInfo = async () => {
      const abbreviatedName = await getAbbreviatedName();

      setAbbreviatedName(abbreviatedName === "" ? "JV" : abbreviatedName);
    };

    loadInfo();
  }, []);

  return (
    <View style={styles.containerHeader}>
      <Text style={{ fontSize: 24, fontWeight: "bold", paddingLeft: 20 }}>
        Personal information
      </Text>
      <View style={{ flex: 1 }}>
        <View style={styles.avatarContainer}>
          <View style={{ paddingLeft: 20 }}>
            <Text style={{ color: "gray", paddingLeft: 20 }}>Avatar</Text>

            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                }}
              />
            ) : (
              <View
                style={{
                  width: 80,
                  height: 80,
                  borderRadius: 40,
                  backgroundColor: "gray",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{ fontSize: 24, fontWeight: "bold", color: "white" }}
                >
                  {abbreviatedName}
                </Text>
              </View>
            )}
          </View>
          <TouchableOpacity
            onPress={onPickImage}
            style={[
              styles.editButton,
              { backgroundColor: "gray", borderRadius: 5 },
            ]}
          >
            {loadingImagePicker ? (
              <ActivityIndicator size="small" />
            ) : (
              <Text style={styles.avatarButtonText}>Change</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.editButton, { borderColor: "gray", borderWidth: 1 }]}
          >
            <Text style={[styles.avatarButtonText, { color: "gray" }]}>
              Remove
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
//------ FORM
function formProfile(
  inputList: {
    title: string;
    setter: React.Dispatch<React.SetStateAction<string>>;
    value: string;
  }[],
  checkboxList: {
    title: string;
    setter: React.Dispatch<React.SetStateAction<boolean>>;
    value: boolean;
  }[]
) {
  return (
    <View style={styles.containerForm}>
      {inputList.map((inputItem, index) => (
        <View key={index} style={{ width: "80%", marginBottom: 20 }}>
          {inputFormProfile(inputItem.title, inputItem.setter, inputItem.value)}
        </View>
      ))}

      <View style={{ width: "80%" }}>
        <Text
          style={{
            marginBottom: 10,
            fontWeight: "bold",
            fontSize: 20,
            color: "#6a6a6aff",
          }}
        >{`Email notifications`}</Text>
        {checkboxList.map((checkboxItem, index) =>
          checkInputProfile(
            checkboxItem.title,
            checkboxItem.setter,
            checkboxItem.value,
            `checkbox-${index}`
          )
        )}
      </View>
    </View>
  );
}
function inputFormProfile(
  title: string,
  setNewValue: (value: string) => void,
  value: string
) {
  return (
    <View style={{ width: "100%" }}>
      <Text>{title}</Text>
      <TextInput
        style={styles.input}
        onChangeText={setNewValue}
        value={value}
      />
    </View>
  );
}
function checkInputProfile(
  title: string,
  setNewValue: (value: boolean) => void,
  value: boolean,
  key: string
) {
  return (
    <Checkbox
      key={key}
      size={25}
      isChecked={value}
      text={title}
      style={{ marginBottom: 10 }}
      onPress={setNewValue}
      innerIconStyle={{
        borderColor: "green",
        borderRadius: 5,
      }}
      iconStyle={{ borderRadius: 5 }}
      fillColor={"#039719"}
      unFillColor={"transparent"}
      textStyle={{
        textDecorationLine: "none",
      }}
    />
  );
}
//------ FOOTER
function footerProfile(
  handleSignOut: () => void,
  handleResetProfile: () => void,
  handleSaveProfile: () => void
) {
  return (
    <View style={styles.containerFooter}>
      <View
        style={{
          width: "100%",

          justifyContent: "center",
          paddingHorizontal: 30,
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleSignOut}
          style={[
            styles.changeButton,
            {
              backgroundColor: "#dbba17",
              borderColor: "#ba7507",
              borderWidth: 1,
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
        >
          <Text style={[styles.textChangeButton, { color: "black" }]}>
            Log out
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          width: "100%",

          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleResetProfile}
          style={[
            styles.changeButton,
            { borderColor: "green", borderWidth: 1 },
          ]}
        >
          <Text style={[styles.textChangeButton, { color: "green" }]}>
            Discard changes
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleSaveProfile}
          style={[styles.changeButton, { backgroundColor: "green" }]}
        >
          <Text style={styles.textChangeButton}>Save changes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  //------ HEADER
  containerHeader: {
    flex: 1,
    paddingTop: 60,
    width: "100%",
  },
  avatarContainer: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    // justifyContent: "center",
  },
  editButton: {
    marginLeft: 10,
    padding: 5,
    width: 80,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  //------ FORM
  containerForm: {
    flex: 3,

    alignItems: "center",
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,

    paddingHorizontal: 10,
  },
  //------ FOOTER
  containerFooter: {
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",

    width: "100%",
  },
  changeButton: {
    padding: 10,
    borderRadius: 5,
  },
  textChangeButton: {
    color: "white",
    fontWeight: "bold",
  },
});
