"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Banner from "./(pages)/(auth)/_components/banner";
import TextInput from "./_components/text_input";
import {
  EmailOutlined,
  LockOutlined,
  VisibilityOutlined,
  VisibilityOffOutlined,
  InputOutlined,
} from "@mui/icons-material";
import ButtonCustom from "./_components/button_custom";
import Title from "./_components/title";
import { validateEmail, validatePassword } from "./utils/validations";
import { subscribeUser, unsubscribeUser, sendNotification } from "./actions";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\\-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    if ("serviceWorker" in navigator && "PushManager" in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register(
      "../../public/sw.js",
      {
        scope: "/",
        updateViaCache: "none",
      }
    );
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      ),
    });

    setSubscription(sub);

    const subscriptionData = {
      endpoint: sub.endpoint,
      keys: {
        p256dh: btoa(
          String.fromCharCode(...new Uint8Array(sub.getKey("p256dh")!))
        ),
        auth: btoa(String.fromCharCode(...new Uint8Array(sub.getKey("auth")!))),
      },
    };

    await subscribeUser(subscriptionData);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage("");
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div>
      <h3>Push Notifications</h3>
      {subscription ? (
        <>
          <p>You are subscribed to push notifications.</p>
          <button onClick={unsubscribeFromPush}>Unsubscribe</button>
          <input
            type="text"
            placeholder="Enter notification message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button onClick={sendTestNotification}>Send Test</button>
        </>
      ) : (
        <>
          <p>You are not subscribed to push notifications.</p>
          <button onClick={subscribeToPush}>Subscribe</button>
        </>
      )}
    </div>
  );
}

function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    );

    setIsStandalone(window.matchMedia("(display-mode: standalone)").matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div>
      <h3>Install App</h3>
      <button>Add to Home Screen</button>
      {isIOS && (
        <p>
          To install this app on your iOS device, tap the share button
          <span role="img" aria-label="share icon">
            {" "}
            ⎋{" "}
          </span>
          and then "Add to Home Screen"
          <span role="img" aria-label="plus icon">
            {" "}
            ➕{" "}
          </span>
          .
        </p>
      )}
    </div>
  );
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: "" });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      email: validateEmail(value) || "",
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const fakeToken = "test-token";

    document.cookie = `authToken=${fakeToken}; path=/;`;

    router.push("/home");
  };

  const handleForgetPassword = () => {
    // router.push("/recoverPassword");
    router.push("/resetPassword");
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex">
      <Banner />
      <div className="w-full md:w-1/2 p-8 font-[family-name:var(--font-jost-medium)]">
        <Title className="text-2xl text-primary" title="Iniciar sesión" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="px-2 py-2">
            <TextInput
              label="Correo"
              type="email"
              required
              onChange={handleEmailChange}
              iconLeft={<EmailOutlined />}
              placeholder="Correo electrónico"
              error={errors.email}
            />
            <TextInput
              label="Contraseña"
              type={showPassword ? "text" : "password"}
              required
              onChange={handlePasswordChange}
              iconLeft={<LockOutlined />}
              iconRight={
                showPassword ? (
                  <VisibilityOutlined />
                ) : (
                  <VisibilityOffOutlined />
                )
              }
              onIconClick={handlePasswordVisibility}
              placeholder="••••••••••••••"
            />
          </div>
          <ButtonCustom
            className="w-full"
            variant="filled"
            type="submit"
            backgroundColor="primary"
            icon={<InputOutlined />}
            colorText="background"
            disabled={!email || !password || !!errors.email}
          >
            Iniciar sesión
          </ButtonCustom>
        </form>
        <div className="text-center py-4">
          <ButtonCustom
            variant="text"
            colorText="primary"
            onClick={handleForgetPassword}
          >
            ¿Olvidaste tu contraseña?
          </ButtonCustom>
        </div>
      </div>
    </div>
  );
};

export default function Page() {
  return (
    <div>
      <PushNotificationManager />
      <InstallPrompt />
      <LoginPage />
    </div>
  );
}
