import { makeStyles } from "@mui/styles"

const useStyles = makeStyles({
  button: {
    fontWeight: 400,
    padding: "5px 5px",
    transition: "all .2s",
    backgroundColor: "rgba(246,246,246,.5)",
    borderRadius: "7px",
    color: "#9b9b9b",
    border: "1px solid #e4e4e4",
    '&:hover :first-child': {
      color: "rgb(238, 130, 59)",
    },
    fontSize: 14,
  },
  inTime: {
    fontSize: 14,
    fontWeight: 500,
    color: "#108f3e",
  },
});
export default useStyles