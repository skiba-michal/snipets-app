import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import PsychologyIcon from "@mui/icons-material/Psychology";
import ConstructionIcon from "@mui/icons-material/Construction";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import QuizIcon from "@mui/icons-material/Quiz";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import DataObjectIcon from "@mui/icons-material/DataObject";

const baseDashboardRoute = "/dashboard";
export const navigation = [
  {
    link: `${baseDashboardRoute}/snippets`,
    title: "Snipety",
    icon: TextSnippetIcon,
    settingsPropName: 'showSnippets'
  },
  {
    link: `${baseDashboardRoute}/science`,
    title: "Nauka",
    icon: PsychologyIcon,
    settingsPropName: 'showScience'
  },
  {
    link: `${baseDashboardRoute}/apps-snippets`,
    title: "Projekty",
    icon: ConstructionIcon,
    settingsPropName: 'showProjectSnippets'
  },
  {
    link: `${baseDashboardRoute}/interview-questions`,
    title: "Pytania rekrutacyjne",
    icon: QuestionAnswerIcon,
    settingsPropName: 'showInterviewQuestions'
  },
  {
    link: `${baseDashboardRoute}/languages`,
    title: "Języki",
    icon: QuizIcon,
    settingsPropName: 'showLanguages'
  },
  {
    link: `${baseDashboardRoute}/compilers`,
    title: "Komplitory",
    icon: AutorenewIcon,
    settingsPropName: 'showCompilators'
  },
  {
    link: `${baseDashboardRoute}/generators`,
    title: "Generatory",
    icon: DataObjectIcon,
    settingsPropName: 'showGenerators'
  },
];