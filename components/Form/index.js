import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.scss";

const InputForm = (props) => {
  const { setAddress, setName } = props;

  const handleName = (e) => {
    e.preventDefault();
    setName(e.target.value);
  };

  const handleAddress = (e) => {
    e.preventDefault();
    setAddress(e.target.value);
  };
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      noValidate
      autoComplete="off"
    >
      <div className={styles[`input-form`]}>
        <TextField
          required
          id="nama"
          label="Nama"
          variant="outlined"
          onChange={(e) => handleName(e)}
        />
        <TextField
          required
          id="alamat-kripto"
          label="Alamat Kripto"
          placeholder="Contoh: 0x3C4....293BC"
          variant="outlined"
          onChange={(e) => handleAddress(e)}
        />
      </div>
    </Box>
  );
};

export default InputForm;
