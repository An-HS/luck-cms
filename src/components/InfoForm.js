import React from "react";
import TextField from "@mui/material/TextField";
import Skeleton from "@mui/material/Skeleton";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import PhoneAndroidIcon from "@mui/icons-material/PhoneAndroid";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { userAdd, userUpdate } from "../redux/userSlice";
import "./InfoForm.css";

const InfoForm = (props) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { user, updating } = useSelector(selectUser);
  const [inputName, setInputName] = React.useState(user.name || "");
  const [inputCard, setInputCard] = React.useState(user.cardId || "");
  const [inputPhone, setInputPhone] = React.useState(user.phone || "");
  const [inputEmail, setInputEmail] = React.useState(user.mail || "");
  const [errorName, setErrorName] = React.useState(false);
  const [errorCard, setErrorCard] = React.useState(false);
  const [errorPhone, setErrorPhone] = React.useState(false);
  const [errorEmail, setErrorEmail] = React.useState(false);
  const [colorName, setColorName] = React.useState("gray");
  const [colorCard, setColorCard] = React.useState("gray");
  const [colorPhone, setColorPhone] = React.useState("gray");
  const [colorEmail, setColorEmail] = React.useState("gray");
  const [helperName, setHelperName] = React.useState(false);
  const [helperCard, setHelperCard] = React.useState(false);
  const [helperPhone, setHelperPhone] = React.useState(false);
  const [helperEmail, setHelperEmail] = React.useState(false);
  const emailRule =
    /^[\w!#$%&'*+-/=?^_`{|}~]+(.[\w!#$%&'*+-/=?^_`{|}~]+)*@[\w-]+(.[\w-]+)+$/;
  const phoneRule = "^(09)[0-9]{8}$";
  const globalPhoneRule = "^(886)[0-9]{9}$";
  const handleLeave = () => {
    props.setUserStatus("");
  };

  let Infodata = {
    id: user.id,
    name: inputName,
    email: inputEmail,
    phone: inputPhone,
    cardId: inputCard,
  };

  let Adddata = {
    lockerNo: location.state,
    name: inputName,
    email: inputEmail,
    phone: inputPhone,
    cardId: inputCard,
  };

  const verifyName = (e) => {
    if (e.target.value.length <= 0) {
      setErrorName(true);
      setColorName("#d32f2f");
      setHelperName("必須為中文或英文");
    } else {
      setErrorName(false);
      setColorName("gray");
      setHelperName(false);
    }
  };
  const verifyCard = (e) => {
    if (e.target.value.length <= 6 || e.target.value.length >= 16) {
      setErrorCard(true);
      setColorCard("#d32f2f");
      setHelperCard("卡號輸入格式不符");
    } else {
      setErrorCard(false);
      setColorCard("gray");
      setHelperCard(false);
    }
  };

  const verifyPhone = (e) => {
    if (e.target.value.length <= 0) {
      setErrorPhone(true);
      setColorPhone("#d32f2f");
      setHelperPhone("手機輸入格式不符");
    } else if (
      e.target.value.startsWith("09") &&
      e.target.value.search(phoneRule) === -1
    ) {
      setErrorPhone(true);
      setColorPhone("#d32f2f");
      setHelperPhone("手機輸入格式不符");
    } else if (
      e.target.value.startsWith("8869") &&
      e.target.value.search(globalPhoneRule) === -1
    ) {
      setErrorPhone(true);
      setColorPhone("#d32f2f");
      setHelperPhone("手機輸入格式不符");
    } else if (
      !(e.target.value.startsWith("8869") || e.target.value.startsWith("09"))
    ) {
      setErrorPhone(true);
      setColorPhone("#d32f2f");
      setHelperPhone("手機輸入格式不符");
    } else {
      setErrorPhone(false);
      setColorPhone("gray");
      setHelperPhone(false);
    }
  };

  const verifyEmail = (e) => {
    if (e.target.value.search(emailRule) === -1 || e.target.value.length <= 0) {
      setErrorEmail(true);
      setColorEmail("#d32f2f");
      setHelperEmail("Email 輸入格式不符");
    } else {
      setErrorEmail(false);
      setColorEmail("gray");
      setHelperEmail(false);
    }
  };

  const handleSave = () => {
    if (inputName === undefined) {
      setErrorName(true);
      setColorName("#d32f2f");
      setHelperName("必須為中文或英文");
    }
    if (inputPhone === undefined) {
      setErrorPhone(true);
      setColorPhone("#d32f2f");
      setHelperPhone("卡號輸入格式不符");
    }
    if (inputCard === undefined) {
      setErrorCard(true);
      setColorCard("#d32f2f");
      setHelperCard("手機輸入格式不符");
    }
    if (inputEmail === undefined) {
      setErrorEmail(true);
      setColorEmail("#d32f2f");
      setHelperEmail("Email 輸入格式不符");
    }
    if (
      errorName === false &&
      errorCard === false &&
      errorPhone === false &&
      errorEmail === false &&
      inputName !== undefined &&
      inputCard !== undefined &&
      inputPhone !== undefined &&
      inputEmail !== undefined
    ) {
      switch (props.userStatus) {
        case "AddStatus":
          dispatch(userAdd(Adddata));
          props.setUserStatus("");
          break;
        case "EditStatus":
          dispatch(userUpdate(Infodata));
          props.setUserStatus("");
          break;
        default:
          props.setUserStatus("");
          return true;
      }
    }
  };
  return (
    <div>
      <div className="userInfo name">
        <AccountCircleIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {updating ? (
          <Box
            sx={{
              display: "flex",
              width: "60px",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ width: 10 }}>
              <Skeleton animation="wave" />
            </Box>
            <Box sx={{ width: 10 }}>
              <Skeleton animation="wave" />
            </Box>
            <Box sx={{ width: 10 }}>
              <Skeleton animation="wave" />
            </Box>
          </Box>
        ) : (
          <TextField
            size="small"
            error={errorName}
            value={inputName}
            onBlur={(e) => {
              verifyName(e);
            }}
            onChange={(e) => {
              setInputName(
                e.target.value.replace(/[\d"'˙<>;().!#$%&*+\-/=?^_`{|}~@]/g, "")
              );
              setErrorName(false);
            }}
            // defaultValue={user.name}
            // onChange={(e) => setInputName(e.target.value)}
            InputLabelProps={{ style: { color: colorName } }}
            sx={{
              width: "100%",
              borderColor: "#000",
              margin: "6px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: { colorName }, //FIELD 框
                },
              },
            }}
            label="姓名"
            autoComplete="current-password"
            inputProps={{
              size: "small",
              style: {},
            }}
            helperText={helperName}
          ></TextField>
        )}
      </div>
      <div className="userInfo card">
        <CreditCardIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {updating ? (
          <Skeleton animation="wave" width={"60%"} sx={{ marginLeft: 1 }} />
        ) : (
          <TextField
            size="small"
            error={errorCard}
            value={inputCard}
            onBlur={(e) => {
              verifyCard(e);
            }}
            onChange={(e) => {
              setInputCard(e.target.value.replace(/\D/g, ""));
              setErrorCard(false);
            }}
            // defaultValue={user.cardId}
            // onChange={(e) => setInputCard(e.target.value)}
            InputLabelProps={{ style: { color: colorCard } }}
            sx={{
              width: "100%",
              borderColor: "#000",
              margin: "6px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: { colorCard },

                  //FIELD 框
                },
              },
            }}
            label="卡號"
            autoComplete="current-password"
            inputProps={{
              style: {},
            }}
            helperText={helperCard}
          ></TextField>
        )}
      </div>
      <div className="userInfo phone">
        <PhoneAndroidIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {updating ? (
          <Skeleton animation="wave" width={"40%"} sx={{ marginLeft: 1 }} />
        ) : (
          <TextField
            size="small"
            error={errorPhone}
            value={inputPhone}
            onBlur={(e) => {
              verifyPhone(e);
            }}
            onChange={(e) => {
              setInputPhone(e.target.value.replace(/[^\d.]/g, ""));
              setErrorPhone(false);
            }}
            // defaultValue={user.phone}
            // onChange={(e) => setInputPhone(e.target.value)}
            InputLabelProps={{ style: { color: colorPhone } }}
            sx={{
              width: "100%",
              borderColor: "#000",
              margin: "6px",
              "& .MuiInputLabel-root": {},
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: { colorPhone }, //FIELD 框
                },
              },
            }}
            label="電話"
            autoComplete="current-password"
            inputProps={{
              style: {},
            }}
            helperText={helperPhone}
          ></TextField>
        )}
      </div>
      <div className="userInfo mail">
        <MailOutlineIcon style={{ fontSize: "30", margin: "8px 0" }} />
        {updating ? (
          <Skeleton animation="wave" width={"80%"} sx={{ marginLeft: 1 }} />
        ) : (
          <TextField
            size="small"
            error={errorEmail}
            value={inputEmail}
            onBlur={(e) => {
              verifyEmail(e);
            }}
            onChange={(e) => {
              setInputEmail(
                e.target.value.replace(/[^\w!#$%&'*+-/=?^_`{|}~@]|_/gi, "")
              );
              setErrorEmail(false);
            }}
            // defaultValue={user.email}
            // onChange={(e) => setInputEmail(e.target.value)}
            InputLabelProps={{ style: { color: colorEmail } }}
            sx={{
              width: "100%",
              borderColor: "#000",
              margin: "6px",
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: { colorEmail }, //FIELD 框
                },
              },
            }}
            label="電子信箱"
            autoComplete="current-password"
            inputProps={{
              style: {},
            }}
            helperText={helperEmail}
          ></TextField>
        )}
      </div>
      <div className="save-btn">
        <Button
          onClick={handleSave}
          variant="contained"
          style={{
            width: "41%",
            height: 39,
            background: "#363F4E",
            boxShadow: "none",
            fontSize: 18,
            margin: 5,
          }}
        >
          儲存
        </Button>

        <Button
          onClick={handleLeave}
          variant="contained"
          style={{
            width: "41%",
            height: 39,
            background: "#363F4E",
            boxShadow: "none",
            fontSize: 18,
            margin: 5,
          }}
        >
          取消
        </Button>
      </div>
    </div>
  );
};

export default InfoForm;
