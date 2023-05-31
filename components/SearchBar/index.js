import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import styles from "./styles.module.scss"

const SearchBar = (props) => {
  const { handleSearchCard } = props;

  return (
    <div className={styles["search-bar"]}>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}
      >
        <TextField
          fullWidth
          label="Cari Kartu"
          id="fullWidth"
          onChange={(e) => handleSearchCard(e)}
        />
      </Box>
    </div>
  );
};

export default SearchBar;
