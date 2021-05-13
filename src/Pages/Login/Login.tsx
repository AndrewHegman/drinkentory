import {
  IonRouterLink,
  IonPage,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  useIonRouter,
} from "@ionic/react";
import React from "react";
import { connect, ConnectedProps, useDispatch } from "react-redux";
import { authorizeUser } from "../../API/user";
import { RootState } from "../../Redux/Store/index";
import { users } from "../../Redux/Store/Users/Actions";

export interface ILoginProps extends PropsFromRedux {
  successRedirectRoute: string;
}

const mapStateToProps = (state: RootState) => {
  return {
    address: state.common.serverAddress,
  };
};

export const LoginComponent: React.FC<ILoginProps> = (props: ILoginProps) => {
  const [username, setUsername] = React.useState<string>("arhegman@gmail.com");
  const [password, setPassword] = React.useState<string>("changeme1");
  const [showLadingSpinner, setShowLoadingSpinner] = React.useState<boolean>(false);
  const dispatch = useDispatch();
  const ionRouter = useIonRouter();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setShowLoadingSpinner(true);

    authorizeUser(props.address, "arhegman@gmail.com", "changeme1")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((res) => {
        console.log(res);
        setShowLoadingSpinner(false);
        dispatch(users.setToken(res.access_token));
        ionRouter.push(props.successRedirectRoute);
      });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Drinkentory</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {showLadingSpinner && <div>Logging in...</div>}
        <form onSubmit={handleSubmit}>
          <IonItem>
            <IonLabel position="floating">Floating Label</IonLabel>
            <IonInput type={"email"} value={username} onIonChange={(event) => setUsername(event.detail.value || "")} required />
          </IonItem>
          <IonItem>
            <IonLabel position="floating">Floating Label</IonLabel>
            <IonInput type={"password"} value={password} onIonChange={(event) => setPassword(event.detail.value || "")} required></IonInput>
          </IonItem>
          <IonButton type="submit">Submit</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
};

const connector = connect(mapStateToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

export const Login = connector(LoginComponent);
