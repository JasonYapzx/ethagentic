"use client";

import { useState, useEffect } from "react";
import mqtt from "mqtt";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MQTT_BROKER_URL = "broker.hivemq.com";

export default function MqttPublisher() {
  const [client, setClient] = useState<mqtt.MqttClient | null>(null);
  const [topic, setTopic] = useState("storagent/command");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Disconnected");

  // Commented out because app crashes on deployment due to unsecure websocket connection
  // useEffect(() => {
  //   console.log("Connecting to MQTT broker...");
  //   const mqttClient = mqtt.connect("wss://broker.hivemq.com:8884/mqtt");

  //   mqttClient.on("connect", () => {
  //     console.log("Connected to MQTT broker");
  //     setStatus("Connected");
  //     setClient(mqttClient);
  //   });

  //   mqttClient.on("error", (err) => {
  //     console.error("MQTT error:", err);
  //     setStatus("Error: " + err.message);
  //   });

  //   return () => {
  //     mqttClient.end();
  //   };
  // }, []);

  const publishMessage = () => {
    // if (client && topic) {
    //   client.publish(topic, "start", (error) => {
    //     if (error) {
    //       console.error("Publish error:", error);
    //       setStatus("Publish error: " + error.message);
    //     } else {
    //       setStatus("Message published successfully");
    //     }
    //   });
    // }
  };

  return <Button onClick={publishMessage}>Proceed with restock</Button>;
}
