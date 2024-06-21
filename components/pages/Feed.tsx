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
import { useState } from "react";
import { notificationsOutline } from "ionicons/icons";
import Editor from "../editor/Editor";

const Feed = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [title, setTitle] = useState("Title");

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="border-b-1 dark:border-black ">
          <IonTitle>{title}</IonTitle>
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
      <IonContent fullscreen>
        <Editor onTitleChange={handleTitleChange} />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
