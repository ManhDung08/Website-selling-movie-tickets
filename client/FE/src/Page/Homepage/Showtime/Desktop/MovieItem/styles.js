import { makeStyles } from "@mui/material"

const useStyles = makeStyles({
  addbg: {
    backgroundImage: props => `url(${props.bg})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
    paddingTop: "147.9%",
    borderRadius: 4,
  },
})

export default useStyles
