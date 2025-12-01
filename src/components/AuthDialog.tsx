import * as React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItemButton,
  styled,
  Button,
} from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useTranslation } from 'react-i18next';
import GoogleLogo from './GoogleLogo';

const SignInButton = styled(Button)(() => ({
  textTransform: 'none',
}));

/**
 * Props:
 * - open: whether the dialog is visible
 * - onAnonymousSignIn: called when "Sign in anonymously" is clicked
 * - onGoogleSignIn: called when "Sign in with Google" is clicked
 */
interface AuthDialogProps {
  open: boolean;
  onAnonymousSignIn: () => void;
  onGoogleSignIn: () => void;
}

const AuthDialog: React.FC<AuthDialogProps> = ({
  open,
  onAnonymousSignIn,
  onGoogleSignIn,
}) => {
  const { t } = useTranslation();
  return (
    <Dialog open={open}>
      <DialogTitle>{t('signIn.title')}</DialogTitle>
      <DialogContent dividers>
        <List disablePadding>
          <ListItemButton component="div">
            <SignInButton
              fullWidth
              color="primary"
              variant="contained"
              startIcon={<AccountCircleIcon />}
              onClick={onAnonymousSignIn}
            >
              {t('signIn.anonymous')}
            </SignInButton>
          </ListItemButton>
          <ListItemButton component="div">
            <SignInButton
              fullWidth
              color="primary"
              variant="contained"
              startIcon={<GoogleLogo />}
              onClick={onGoogleSignIn}
            >
              {t('signIn.google')}
            </SignInButton>
          </ListItemButton>
        </List>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
