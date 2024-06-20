import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonButton,
  IonIcon,
  IonContent,
  IonMenuButton,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { notificationsOutline } from "ionicons/icons";
import Notifications from "./Notifications";
import Editor from "../editor/Editor";
// import { Keyboard } from "@capacitor/keyboard";

const Feed = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [title, setTitle] = useState("Editor");
  const [isEditing, setIsEditing] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const handleTitleChange = (event: any) => {
    setTitle(event.target.value);
  };

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>
            {isEditing ? (
              <input
                type="text"
                value={title}
                onChange={handleTitleChange}
                onBlur={toggleEditing}
                className="bg-transparent border-b border-gray-400 focus:outline-none"
                autoFocus
              />
            ) : (
              <span onClick={toggleEditing}>{title}</span>
            )}
          </IonTitle>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton onClick={() => setShowNotifications(true)}>
              <IonIcon icon={notificationsOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding" fullscreen>
        <Editor keyboardHeight={keyboardHeight} />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
