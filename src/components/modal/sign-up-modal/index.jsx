import PropTypes from "prop-types";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import { forwardRef, cloneElement, useState } from "react";
import { Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";
import { auth } from '../../../service'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Fade = forwardRef(function Fade(props, ref) {
  const {
    children,
    in: open,
    onClick,
    onEnter,
    onExited,
    ownerState,
    ...other
  } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter(null, true);
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited(null, true);
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {cloneElement(children, { onClick })}
    </animated.div>
  );
});

Fade.propTypes = {
  children: PropTypes.element.isRequired,
  in: PropTypes.bool,
  onClick: PropTypes.any,
  onEnter: PropTypes.func,
  onExited: PropTypes.func,
  ownerState: PropTypes.any,
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Index({ open, handleClose, email }) {
  const [code, setCode] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(code);
    const payload = {
      code: code,
      email: email
    }
    try {
      const response = await auth.auth_verify(payload)
      if(response.status === 201) {
        navigate('/')
        toast.success("Successfully registration")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Modal
        aria-labelledby="spring-modal-title"
        aria-describedby="spring-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            TransitionComponent: Fade,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="spring-modal-title"
              variant="h5"
              sx={{ marginY: "20px" }}
              className="text-center font-bold"
              component="h2"
            >
              Enter Verification Code
            </Typography>
            <form>
              <TextField
                sx={{ marginY: "15px" }}
                onChange={(e) => setCode(e.target.value)}
                type="text"
                fullWidth
                label="Code"
                id="code"
                name='code'
              />
              <Button onClick={handleSubmit} variant="contained" type="submit">
                Sign Up
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
