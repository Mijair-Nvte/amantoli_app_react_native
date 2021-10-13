import React, { useState, useEffect } from "react";
import { StyleSheet, View } from "react-native";
import AwesomeIcon from "react-native-vector-icons/FontAwesome"
import colors from "../../styles/colors";
import SelectDropdown from 'react-native-select-dropdown'

export default function Colors(props) {
  const { productColors, setProductColors } = props;

  console.log("Colores " + productColors);

  const ej = ["Blanco", "Azul", "Rojo", "Negro"]

  const renderIcon = () => {
    return (
      <AwesomeIcon size={22} name="angle-down" type="font-awesome" />
    )
  }

  return (
    <View>
      <SelectDropdown
        defaultValueByIndex={0}
        renderDropdownIcon={renderIcon}
        data={ej}
        buttonStyle={styles.button}
        rowTextStyle={styles.buttonTextStyle}
        rowStyle={styles.dropDownPicker}
        buttonTextStyle={styles.buttonTextStyle}
        dropDownStyle={styles.dropDownPicker}
        onSelect={(selectedItem, index) => {
          console.log(selectedItem, index)
        }}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem
        }}
        rowTextForSelection={(item, index) => {
          return item
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  dropDownPicker: {
    backgroundColor: colors.bgGray,
    borderWidth: 1,
    borderColor: colors.bgGray
  },
  labelStyle: {
    color: colors.fontBlack,
  },
  buttonTextStyle: {
    color: colors.fontBlack,
  },
  button: {
    borderRadius: 5,
    paddingLeft: 15,
    borderWidth: 3,
    borderColor: colors.bgGray
  }
});
