import { python, rust, cpp, arduino, docker, linux } from "../../mocks/technology.mock";
import { ProjectType, ProjectCategory } from "../../model/project.model";

export const SECURITY_LAB_IOT_IAM = {
    id: -1,
    name: "Security Lab IoT & IAM",
    type: ProjectType.HOME,
    category: ProjectCategory.CYBER,
    date: "",
    project_ico: "icons/package.png",
    overview_pictures: ["icons/package.png"],
    description: {
        en: "A self-built, isolated security lab exploring IoT and machine identity end to end, where every tool is coded from scratch rather than assembled from existing ones, to truly understand the logic behind them.\n\n"
            + "The lab mixes real hardware: ESP32 devices acting as deliberately vulnerable objects (an unauthenticated MQTT sensor, a fake IP camera, a hardcoded-password actuator), an OpenWrt router for network segmentation, and a central Linux server running the broker, the monitoring and the identity services.\n\n"
            + "On the offensive side, I build my own tooling in Rust: a port scanner and a raw-socket sniffer, a fuzzer, and a MITM on MQTT, plus firmware extraction and reverse engineering with Ghidra, all aimed only at my own isolated network.\n\n"
            + "The flagship is a zero-trust identity system: a home-made Certificate Authority issuing one certificate per object, mutual TLS, a mini identity provider with short-lived tokens and per-object permissions, and automatic revocation triggered by a home-made IDS, with the CA root key kept offline.\n\n", fr: ""
    },
    banner: "",
    technologies: [
        python,
        rust,
        cpp,
        arduino,
        docker,
        linux
    ],
    path: "sec-lab-iot-iam"
}
