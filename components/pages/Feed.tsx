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
  const [title, setTitle] = useState("Editor");
  const [isEditing, setIsEditing] = useState(false);

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
      <IonContent className="" fullscreen>
        <Editor />
      </IonContent>
    </IonPage>
  );
};

export default Feed;
