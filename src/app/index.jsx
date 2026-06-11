import React, { useState } from 'react';
import { View, Text, Pressable, NativeModules } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Stack, useRouter } from 'expo-router';

// Detect if Viro React Native modules are available (they won't be in standard Expo Go)
const isViroAvailable = !!(
  NativeModules.VRTMaterialManager ||
  NativeModules.VRTAnimationManager ||
  NativeModules.VRTSceneNavigatorModule ||
  NativeModules.VRTARSceneNavigatorModule
);

// Declare Viro components dynamically so they aren't loaded in clients where Viro native module binaries don't exist.
// This prevents 'requireNativeComponent' errors at the module evaluation level in Expo Go.
let Viro3DObject, 
    ViroAnimations, 
    ViroVRSceneNavigator, 
    ViroMaterials, 
    ViroSphere,
    ViroScene,
    ViroNode,
    ViroAmbientLight,
    ViroDirectionalLight;

if (isViroAvailable) {
  try {
    const Viro = require("@reactvision/react-viro");
    Viro3DObject = Viro.Viro3DObject;
    ViroAnimations = Viro.ViroAnimations;
    ViroVRSceneNavigator = Viro.ViroVRSceneNavigator;
    ViroMaterials = Viro.ViroMaterials;
    ViroSphere = Viro.ViroSphere;
    ViroScene = Viro.ViroScene;
    ViroNode = Viro.ViroNode;
    ViroAmbientLight = Viro.ViroAmbientLight;
    ViroDirectionalLight = Viro.ViroDirectionalLight;

    // Create materials for the 3D car model and color selectors
    ViroMaterials.createMaterials({
      white: {
        lightingModel: "PBR",
        diffuseTexture: require("../../assets/test/object_car_main_Base_Color.png"),
        metallicTexture: require("../../assets/test/object_car_main_Metallic.png"),
        roughnessTexture: require("../../assets/test/object_car_main_Roughness.png"),
      },
      blue: {
        lightingModel: "PBR",
        diffuseTexture: require("../../assets/test/object_car_main_Base_Color_blue.png"),
        metallicTexture: require("../../assets/test/object_car_main_Metallic.png"),
        roughnessTexture: require("../../assets/test/object_car_main_Roughness.png"),
      },
      // Materials of the selector spheres
      white_sphere: {
        lightingModel: "PBR",
        diffuseColor: 'rgb(231, 231, 231)'
      },
      blue_sphere: {
        lightingModel: "PBR",
        diffuseColor: 'rgb(19, 42, 143)'
      },
    });

    // Register animations for scale transitions
    ViroAnimations.registerAnimations({
      scaleUp: {
        properties: {
          scaleX: 1,
          scaleY: 1,
          scaleZ: 1,
        },
        duration: 500,
        easing: "bounce"
      },
      scaleDown: {
        properties: {
          scaleX: 0,
          scaleY: 0,
          scaleZ: 0,
        },
        duration: 200,
      },
      scaleCar: {
        properties: {
          scaleX: 0.09,
          scaleY: 0.09,
          scaleZ: 0.09,
        },
        duration: 200,
        easing: "bounce"
      }
    });
  } catch (e) {
    console.warn("Viro React Native modules failed to initialize:", e.message);
  }
} else {
  console.warn("Viro React Native modules are not available in this client (Expo Go fallback enabled).");
}

// ----------------------------------------------------
// VR SCENE DEFINITION (No Camera Tracker Required)
// ----------------------------------------------------
const VRCarScene = () => {
  const [texture, setTexture] = useState("white");
  const [showButton, setShowButton] = useState(true);
  const [buttonAnimation, setButtonAnimation] = useState("scaleUp");
  const [runButtonAnimation, setRunButtonAnimation] = useState(false);

  // Toggle button group visibility
  const _toggleButton = () => {
    if (showButton) {
      setButtonAnimation("scaleDown");
    } else {
      setButtonAnimation("scaleUp");
    }
    setRunButtonAnimation(true);
    setShowButton(!showButton);
  }

  const _onButtonAnimFinish = () => {
    setRunButtonAnimation(false);
  }

  const _selectWhite = () => {
    setTexture("white");
  }

  const _selectBlue = () => {
    setTexture("blue");
  }

  return (
    <ViroScene>
      {/* Lights inside the VR world */}
      <ViroAmbientLight color="#ffffff" intensity={150} />
      <ViroDirectionalLight color="#ffffff" direction={[0, -1, -1]} intensity={500} />

      {/* Selector Menu Node - Positioned slightly above the car */}
      <ViroNode
        position={[0, 0.4, -2]}
        scale={[1, 1, 1]}
        transformBehaviors={['billboardY']}
        animation={{
          name: buttonAnimation,
          run: runButtonAnimation,
          onFinish: _onButtonAnimFinish
        }}
      >
        {/* White Selector Sphere */}
        <ViroSphere
          materials={['white_sphere']}
          heightSegmentCount={20}
          widthSegmentCount={20}
          radius={0.08}
          position={[-0.3, 0, 0]}
          onClick={_selectWhite}
        />
        {/* Blue Selector Sphere */}
        <ViroSphere
          materials={['blue_sphere']}
          heightSegmentCount={20}
          widthSegmentCount={20}
          radius={0.08}
          position={[0.3, 0, 0]}
          onClick={_selectBlue}
        />
      </ViroNode>

      {/* 3D Car Model - Placed directly in front of the viewer */}
      <Viro3DObject
        position={[0, -0.6, -2.5]}
        scale={[0.08, 0.08, 0.08]}
        source={require("../../assets/test/object_car.obj")}
        resources={[require("../../assets/test/object_car.mtl")]}
        type="OBJ"
        materials={texture}
        onClick={_toggleButton}
        animation={{ name: 'scaleCar', run: true }}
      />
    </ViroScene>
  );
}

// ----------------------------------------------------
// ROOT VIEW & EXPORT
// ----------------------------------------------------
export default function Home() {
  const router = useRouter();

  // Custom profile button for the header
  const profileButton = () => (
    <Pressable
      onPress={() => router.push('/profile')}
      style={({ pressed }) => [
        {
          marginRight: 8,
          paddingHorizontal: 16,
          paddingVertical: 8,
          borderRadius: 12,
          backgroundColor: pressed ? '#334155' : '#1E293B',
          borderWidth: 1,
          borderColor: '#475569',
          flexDirection: 'row',
          alignItems: 'center',
          gap: 6,
        }
      ]}
    >
      <Text style={{ color: '#F8FAFC', fontSize: 13, fontWeight: '600' }}>👤 Profile</Text>
    </Pressable>
  );

  if (!isViroAvailable) {
    return (
      <View style={{ flex: 1, backgroundColor: "#0F172A", justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <Stack.Screen
          options={{
            title: 'Home Dashboard',
            headerRight: profileButton,
          }}
        />
        <StatusBar style="light" />
        <View style={{ backgroundColor: '#1E293B', padding: 28, borderRadius: 24, borderWidth: 1, borderColor: '#334155', alignItems: 'center', width: '100%', maxWidth: 340 }}>
          <Text style={{ fontSize: 54, marginBottom: 16 }}>⚠️</Text>
          <Text style={{ color: '#F8FAFC', fontSize: 20, fontWeight: '700', marginBottom: 12, textAlign: 'center' }}>
            Development Build Required
          </Text>
          <Text style={{ color: '#94A3B8', fontSize: 14, textAlign: 'center', lineHeight: 22, marginBottom: 24 }}>
            This VR project uses custom native binary code which is not included in the standard Expo Go client.
          </Text>
          <View style={{ backgroundColor: 'rgba(59, 130, 246, 0.1)', borderWidth: 1, borderColor: 'rgba(59, 130, 246, 0.2)', padding: 16, borderRadius: 16, width: '100%' }}>
            <Text style={{ color: '#60A5FA', fontSize: 13, textAlign: 'center', fontWeight: '600', lineHeight: 18 }}>
              Please download and install your custom APK development build (from EAS Build) and open the app from there!
            </Text>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <Stack.Screen
        options={{
          title: 'VR Showroom',
          headerRight: profileButton,
        }}
      />
      <StatusBar style="light" />
      <ViroVRSceneNavigator
        autofocus={true}
        initialScene={{ scene: VRCarScene }}
        style={{ flex: 1 }}
      />
    </View>
  );
}
