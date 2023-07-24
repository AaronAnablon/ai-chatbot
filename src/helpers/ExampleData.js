import {
    GiGraduateCap,
    GiNotebook,
    GiBirdTwitter,
    GiKeyCard,
} from "react-icons/gi";

const ExampleData = [
    {
        title: 'Grammar correction',
        desc: 'Convert ungrammatical statements into standard English.',
        prompt: 'You will be provided with statements, and your task is to convert them to standard English. Here is the statement: She no went to the market.',
        sample: 'She did not go to the market.',
        logo: <GiGraduateCap className="w-full h-full" />,
    },
    {
        title: 'Summarize for a 2nd grader',
        desc: 'Simplify text to a level appropriate for a second-grade student.',
        prompt: 'Summarize content you are provided with for a second-grade student. Here is the content: Jupiter is the fifth planet from the Sun and the largest in the Solar System. It is a gas giant with a mass one-thousandth that of the Sun, but two-and-a-half times that of all the other planets in the Solar System combined. Jupiter is one of the brightest objects visible to the naked eye in the night sky, and has been known to ancient civilizations since before recorded history. It is named after the Roman god Jupiter.[19] When viewed from Earth, Jupiter can be bright enough for its reflected light to cast visible shadows, and is on average the third-brightest natural object in the night sky after the Moon and Venus.',
        sample: 'Jupiter is a really big planet in our Solar System. It is the fifth planet from the Sun and it is the largest planet. It is called a gas giant because it is made mostly of gas. Jupiter is much smaller than the Sun, but it is bigger than all the other planets combined. It is very bright and can be seen in the night sky without a telescope. People have known about Jupiter for a very long time, even before they started writing things down. It is named after a god from ancient Rome. Sometimes, Jupiter is so bright that it can make shadows on Earth. It is usually the third-brightest thing we can see in the night sky, after the Moon and Venus.',
        logo: <GiNotebook className="w-full h-full" />,
    },
    {
        title: 'Keywords',
        desc: 'Extract keywords from a block of text.',
        prompt: 'You will be provided with a block of text, and your task is to extract a list of keywords from it. Here is the text: Black-on-black ware is a 20th- and 21st-century pottery tradition developed by the Puebloan Native American ceramic artists in Northern New Mexico. Traditional reduction-fired blackware has been made for centuries by pueblo artists. Black-on-black ware of the past century is produced with a smooth surface, with the designs applied through selective burnishing or the application of refractory slip. Another style involves carving or incising designs and selectively polishing the raised areas. For generations several families from Kha &quot;po Owingeh and P&quot;ohwhóge Owingeh pueblos have been making black-on-black ware with the techniques passed down from matriarch potters. Artists from other pueblos have also produced black-on-black ware. Several contemporary artists have created works honoring the pottery of their ancestors.',
        sample: "Black-on-black ware, pottery tradition, Puebloan Native American, ceramic artists, Northern New Mexico, reduction-fired blackware, pueblo artists, smooth surface, designs, selective burnishing, refractory slip, carving, incising designs, polishing, generations, families, Kha'po Owingeh, P'ohwhóge Owingeh pueblos, matriarch potters, contemporary artists, ancestors",
        logo: <GiKeyCard className="w-full h-full" />,
    },
    {
        title: 'Tweet classifier',
        desc: 'Detect sentiment in a tweet.',
        prompt: 'You will be provided with a tweet, and your task is to classify its sentiment as positive, neutral, or negative.Here is the tweet: I loved the new Batman movie!',
        sample: 'positive',
        logo: <GiBirdTwitter className="w-full h-full" />,
    },
]
export default ExampleData;