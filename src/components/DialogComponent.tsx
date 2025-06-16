import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface CustomDialogsProps {
  open: boolean;
  title:string
  onClose: () => void;
  children: React.ReactNode;
  onSubmit: () => void;
}

export const CustomDialogs = ({
  onClose,
  open,
  title,
  children,
  onSubmit,
}: CustomDialogsProps) => {
  return (
    <>
      <BootstrapDialog
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            console.log("Form submitted");
            onSubmit();
          }}
        >
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            {title}
          </DialogTitle>
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={(theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[700],
            })}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent dividers>{children}</DialogContent>
          <DialogActions>
            <Button type="submit">
              Save changes
            </Button>
          </DialogActions>
        </form>
      </BootstrapDialog>
    </>
  );
};
