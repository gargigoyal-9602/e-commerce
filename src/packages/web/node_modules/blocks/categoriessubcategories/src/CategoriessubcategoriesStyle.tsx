import { StyleSheet } from "react-native";
import scale, { verticalScale } from "../../../framework/src/utils/Scale";
import COLOR_CONST, {
  FONTS
} from "../../studio-store-ecommerce-theme/src/AppFonts";

// Customizable Area Start
// Customizable Area End

export default StyleSheet.create({
  // Customizable Area Start
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLOR_CONST.white
  },
  containerFlex: {
    flex: 1
  },
  containerDirection: {
    flexDirection: "row"
  },
  mainTableContainer: {
    flex: 1,
    padding: scale(10),
    backgroundColor: COLOR_CONST.white,
    marginHorizontal: scale(8)
  },
  catIcon: {
    width: scale(35),
    height: scale(35),
    borderRadius: 30,
    backgroundColor: "#ddd"
  },
  tableBox: {
    width: scale(370),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#fff",
    backgroundColor: "#FFF",
    marginVertical: 5,
    marginHorizontal: 2
  },
  innerExpendTable: {
    backgroundColor: "#ffffff",
    marginBottom: 5,
    marginHorizontal: 2,
    borderRadius: 4
  },
  innerExpendTableBox: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    marginHorizontal: 2,
    paddingLeft: scale(50),
    paddingVertical: 6
  },
  innerTableBox: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(10)
  },
  addCategoryTitle: {
    fontSize: 16,
    marginVertical: 10
  },
  delete: {
    height: 20,
    width: 20,
    resizeMode: "contain"
  },
  arrow: {
    height: verticalScale(16),
    width: scale(16),
    resizeMode: "contain"
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  webviewStyle: {
    height: 200
  },
  infoSubText: {
    width: "70%",
    fontSize: scale(14),
    marginVertical: 4,
    color: "#999A9C",
    fontFamily: FONTS.GTWalsheimProRegular
  },
  infoText: {
    // width: "83%",
    fontSize: scale(16),
    marginVertical: 4,
    marginLeft: scale(10),
    fontFamily: FONTS.GTWalsheimProRegular
  },
  labelText: {
    fontSize: scale(16),
    fontFamily: FONTS.GTWalsheimProRegular
  },
  viewBtn: {
    backgroundColor: "blue",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: "blue"
  },
  viewBtnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 16
  },
  addBtn: {
    backgroundColor: "blue",
    marginBottom: 10,
    width: 150,
    height: 40,
    display: "flex",
    justifyContent: "center",
    borderRadius: 4,
    alignSelf: "flex-end"
  },
  addtext: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center"
  },
  buttonTop: {
    display: "flex",
    alignSelf: "flex-end",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  closeBtn: {
    backgroundColor: "#fff",
    paddingVertical: 8,
    borderRadius: 4,
    marginTop: 10,
    borderColor: "#ccc",
    borderWidth: 1
  },
  buttonBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  modalBox: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
    display: "flex",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff"
  },
  modal: {
    width: "80%",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ccc",
    marginTop: 80,
    marginLeft: 40,
    padding: 15
  },
  viewBtnWidth: {
    width: "48%"
  },
  closeBtnText: {
    color: "#000",
    textAlign: "center",
    fontSize: 16
  }
  // Customizable Area End
});
