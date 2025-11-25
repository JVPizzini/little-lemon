import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Checkbox from "react-native-bouncy-checkbox";
export function Profile() {
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [orderStatuses, setOrderStatuses] = React.useState(false);
  const [passwordChange, setPasswordChange] = React.useState(false);
  const [specialOffers, setSpecialOffers] = React.useState(false);
  const [newsLetter, setNewsLetter] = React.useState(false);

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

  return (
    <View style={styles.container}>
      {headerProfile()}
      {formProfile(inputList, checkboxList)}
      {footerProfile()}
    </View>
  );
}
//------ HEADER
function headerProfile() {
  return (
    <View style={styles.containerHeader}>
      <Text style={{ fontSize: 24, fontWeight: "bold", paddingLeft: 20 }}>
        Personal information
      </Text>
      <View style={{ flex: 1 }}>
        <View style={styles.avatarContainer}>
          <View>
            <Text style={{ paddingLeft: 20, color: "gray" }}>Avatar</Text>
            <Image
              style={{ width: 80, height: 80, borderRadius: 50 }}
              resizeMode="contain"
              source={require("../../../CURSO/figma/Little Lemon Images/Profile.png")}
            />
          </View>
          <TouchableOpacity
            style={[
              styles.editButton,
              { backgroundColor: "gray", borderRadius: 5 },
            ]}
          >
            <Text style={styles.avatarButtonText}>Change</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.editButton, { borderColor: "gray", borderWidth: 1 }]}
          >
            <Text style={styles.avatarButtonText}>Remove</Text>
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
        <View key={index}>
          {inputFormProfile(inputItem.title, inputItem.setter, inputItem.value)}
        </View>
      ))}
      {checkboxList.map((checkboxItem, index) => (
        <View key={index}>
          {checkInputProfile(
            checkboxItem.title,
            checkboxItem.setter,
            checkboxItem.value
          )}
        </View>
      ))}
    </View>
  );
}
function inputFormProfile(
  title: string,
  setNewValue: (value: string) => void,
  value: string
) {
  return (
    <View
      style={{
        backgroundColor: "white",

        width: "100%",
        alignItems: "center",
      }}
    >
      <View style={{ width: "80%" }}>
        <Text>{title}</Text>

        <TextInput
          style={styles.input}
          onChangeText={setNewValue}
          value={value}
        />
      </View>
    </View>
  );
}
function checkInputProfile(
  title: string,
  setNewValue: (value: boolean) => void,
  value: boolean
) {
  return (
    <Checkbox
      size={25}
      isChecked={value}
      text={title}
      onPress={setNewValue}
      textStyle={{
        textDecorationLine: "none",
      }}
    />
  );
}
//------ FOOTER

function footerProfile() {
  return (
    <View style={styles.containerFooter}>
      <Text>Footer Profile</Text>
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

    // justifyContent: "center",

    backgroundColor: "lightblue",
    width: "100%",
  },
  avatarContainer: {
    flex: 1,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "lightgray",
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

    backgroundColor: "lightgreen",
    width: "100%",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  //------ FOOTER
  containerFooter: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "lightcoral",
    width: "100%",
  },
});
