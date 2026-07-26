import { Message, Responder } from "@/types/chat"

export const INITIAL_MESSAGES: Message[] = [
  {
    id: "1",
    sender: "Sarah Jenkins",
    senderType: "other",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "Welcome to the Aether Chat workspace! We were just discussing the new designs.",
    timestamp: "10:24 AM",
  },
  {
    id: "2",
    sender: "Alex Rivers",
    senderType: "other",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    content: "Yeah, the glassmorphic style is incredible. It feels very premium and modern.",
    timestamp: "10:25 AM",
  },
  {
    id: "3",
    sender: "Aether AI",
    senderType: "ai",
    avatar: "bot",
    content: "Greetings! I'm Aether, your resident workspace assistant. Feel free to explore, or send a message to start chat testing!",
    timestamp: "10:26 AM",
  },
]

export const RESPONDERS: Responder[] = [
  {
    name: "Sarah Jenkins",
    type: "other",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    templates: [
      "Wow, that makes complete sense, {name}!",
      "I was thinking the exact same thing. Let's run it by the dev team.",
      "Glad you could join us, {name}! We were just talking about upgrading to Tailwind v4.",
      "Thanks for sharing that insight! 🌟 Let's iterate on it.",
    ],
  },
  {
    name: "Alex Rivers",
    type: "other",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    templates: [
      "That works for me. Are we deploying this tonight, {name}?",
      "Interesting perspective! I hadn't thought about it that way.",
      "Haha true! 😂 Let's keep it simple and clean.",
      "Awesome contribution, {name}! Let's make sure it looks pixel perfect.",
    ],
  },
  {
    name: "Aether AI",
    type: "ai",
    avatar: "bot",
    templates: [
      "Understood. Analyzing your input... 🧠 I suggest optimizing our state architecture to support this design.",
      "Hello {name}, I've logged your request. Let me know if you need code snippets or structural advice!",
      "As an AI agent, I compute that this chat room has excellent UI aesthetics. Kudos on the setup! 🚀",
      "Analyzing... 📊 The current workspace responsiveness is optimal. Static components are running at maximum efficiency.",
    ],
  },
]
