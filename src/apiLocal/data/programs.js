// Ask Ben about changing honours mathematics and computer science admission requirements

const scienceOneCourseList = [
    "ASTRON 1F03", "BIOLOGY 1A03", "BIOLOGY 1M03", "BIOPHYS 1S03", "CHEM 1A03", "CHEM 1AA3",
    "EARTHSC 1G03", "ENVIRSC 1C03", "ENVSOCTY 1HA3", "ENVSOCTY 1HB3", "LIFESCI 1D03", "MATH 1A03",
    "MATH 1AA3", "MATH 1B03", "MATH 1LS3", "MATH 1LT3", "MATH 1MM3", "MATH 1MP3", "PHYSICS 1A03",
    "PHYSICS 1AA3", "PHYSICS 1C03", "PHYSICS 1CC3", "PSYCH 1F03", "PSYCH 1FF3", "PSYCH 1X03",
    "PSYCH 1XX3", "SCIENCE 1A03"
];

const firstTermMath = ["MATH 1A03", "MATH 1LS3", "MATH 1X03"];
const secondTermMath = ["MATH 1AA3", "MATH 1LT3", "MATH 1XX3"];

// program ids with a leading ? are not official mosiac API codes
// only works for courses worth 3 units
// doesn't support OR logic and nested requirements

const programs = [{
    id: "?HBIOCHEM",
    name: "Honours Biochemistry",
    slug: "honours-biochemistry",
    requirements: [
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 3, from: scienceOneCourseList }
    ]
},
{
    id: "HACTFMTH",
    name: "Honours Actuarial and Financial Mathematics",
    slug: "honours-actuarial-financial-mathematics",
    requirements: [
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
        { count: 1, from: ["MATH 1B03"] }
    ]
},
{
    id: "ENVSCIENCE",
    name: "Environmental Science",
    slug: "honours-environmental-sciences",
    requirements: [
        { count: 2, from: ["EARTHSC 1G03", "ENVIRSC 1C03"] },
        { count: 2, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 6, from: scienceOneCourseList }
    ],
},
{
    id: "HASTROPHYS",
    name: "Honours Astrophysics",
    slug: "honours-astrophysics",
    requirements: [
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
        { count: 1, from: ["PHYSICS 1AA3", "PHYSICS 1CC3"] },
        { count: 1, from: ["CHEM 1A03"] },
        { count: 3, from: scienceOneCourseList }
    ]
},
{
    id: "PHYSICSCI",
    name: "Chemical and Physical Sciences",
    slug: "chemical-physical-sciences",
    requirements: [
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 3, from: ["CHEM 1A03", "CHEM 1AA3", "PHYSICS 1A03", "PHYSICS 1AA3", "PHYSICS 1C03", "PHYSICS 1CC3"] },
        { count: 4, from: scienceOneCourseList }
    ]
},
{
    id: "HHUMBEHVR",
    name: "Honours Applied Psychology in Human Behaviour",
    slug: "honours-aphb",
    requirements: [
        { count: 1, from: ["PSYCH 1F03", "PSYCH 1X03"] },
        { count: 1, from: ["PSYCH 1FF3", "PSYCH 1XX3"] },
    ]
},
{
    id: "HHUMBAUTIS",
    name: "Honours Applied Psychology in Human Behaviour – Autism & Behavioural Science Specialization ",
    slug: "honours-aphb-autism-and-behavioural-science-specialization",
    requirements: [
        { count: 1, from: ["PSYCH 1F03", "PSYCH 1X03"] },
        { count: 1, from: ["PSYCH 1FF3", "PSYCH 1XX3"] },
    ]
},
{
    id: "HHUMBECHLD",
    name: "Honours Applied Psychology in Human Behaviour – Early Childhood Studies Specialization",
    slug: "honours-aphb-ealry-childhood-studies-specialization",
    requirements: [
        { count: 1, from: ["PSYCH 1F03", "PSYCH 1X03"] },
        { count: 1, from: ["PSYCH 1FF3", "PSYCH 1XX3"] },
    ]
},
{
    id: "HBIODENVR",
    name: "Honours Biodiversity and Environmental Sciences",
    slug: "honours-biodiversity-and-environmental-sciences",
    requirements: [
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 1, from: ["EARTHSC 1G03", "ENVIRSC 1C03"] },
        {
            count: 4, from: [...scienceOneCourseList, "COMPSCI 1MD3"]
        }
    ]
},
{
    id: "HBIOLOGY",
    name: "Honours Biology",
    slug: "honours-biology",
    requirements: [
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 2, from: scienceOneCourseList }
    ]
},
{
    id: "HBIOLPHYS",
    name: "Honours Biology — Physiology Research Specialization",
    slug: "honours-biology-physiology-research-specialization",
    requirements: [
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 2, from: scienceOneCourseList }
    ]
},
{
    id: "?HBIOLRS",
    name: "Honours Biology — Research Specialization ",
    slug: "honours-biology-research-specialization",
    requirements: [
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 2, from: scienceOneCourseList }
    ]
},
{
    id: "HBIOLMATH",
    name: "Honours Biology & Mathematics",
    slug: "honours-biology-mathematics",
    requirements: [
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
    ]
},
{
    id: "HBIOLPSYC",
    name: "Honours Biology & Psychology, Neuroscience & Behaviour",
    slug: "honours-biology-pnb",
    requirements: [
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
    ]
},
{
    id: "HCHEMBIOL",
    name: "Honours Chemical Biology",
    requirements: [
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 2, from: scienceOneCourseList }
    ]
},
{
    id: "HCHEMISTRY",
    name: "Honours Chemistry ",
    slug: "honours-chemical-biology",
    requirements: [
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 4, from: scienceOneCourseList }
    ]
},
{
    id: "HERTHENVHC",
    name: "Honours Earth & Environmental Sciences",
    slug: "honours-earth-environmental-sciences",
    requirements: [
        { count: 2, from: ["EARTHSC 1G03", "EARTHSC 1C03"] },
        { count: 1, from: ["CHEM 1A03", "CHEM 1R03"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 4, from: ["BIOLOGY 1A03", "BIOLOGY 1M03", "CHEM 1AA3", "MATH 1AA3", "MATH 1B03", "MATH 1LT3", "PHYSICS 1A03", "PHYSICS 1AA3", "PHYSICS 1C03", "PHYSICS 1CC3", "SCIENCE 1A03"] }
    ]
},
{
    id: "?HENVSCIENCE",
    name: "Honours Environmental Sciences",
    slug: "honours-environmental-sciences",
    requirements: [
        { count: 1, from: ["MATH 1A03", "MATH 1LS3", "MATH 1MM3"] },
        { count: 2, from: ["EARTHSC 1G03", "EARTHSC 1C03", "ENVSOCTY 1HA3", "ENVSOCTY 1HB3"] },
        { count: 3, from: scienceOneCourseList }
    ]
},
{
    id: "HLIFESCI",
    name: "Honours Life Sciences",
    slug: "honours-life-sciences",
    requirements: [
        { count: 1, from: ["BIOLOGY 1A03"] },
        { count: 1, from: ["CHEM 1A03"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 1, from: ["BIOLOGY 1M03", "EARTHSC 1G03", "ENVIRSC 1C03", "PSYCH 1FF3", "PSYCH 1XX3"] },
        { count: 3, from: scienceOneCourseList }
    ]
},
{
    id: "HLSCIORDIS",
    name: "Honours Life Sciences — Origins of Disease Specialization",
    slug: "honours-life-sciences-orgins-of-desease-specialization",
    requirements: [
        { count: 1, from: ["BIOLOGY 1A03"] },
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 1, from: ["BIOLOGY 1M03", "EARTHSC 1G03", "ENVIRSC 1C03", "PSYCH 1FF3", "PSYCH 1XX3"] },
        { count: 2, from: scienceOneCourseList }
    ]
},
{
    id: "HLSCISMSYS",
    name: "Honours Life Sciences — Sensory Motor Systems Specialization ",
    slug: "",
    requirements: [
        { count: 1, from: ["BIOLOGY 1A03"] },
        { count: 1, from: ["CHEM 1A03"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 1, from: ["BIOLOGY 1M03", "EARTHSC 1G03", "ENVIRSC 1C03", "PSYCH 1FF3", "PSYCH 1XX3"] },
        { count: 3, from: scienceOneCourseList }
    ]
},
{
    id: "HMATHCSCI",
    name: "Honours Mathematics & Computer Science",
    slug: "honours-life-sciences-sensory-motor-systems-specialization",
    requirements: [
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
        { count: 1, from: ["MATH 1B03"] },
        { count: 1, from: ["COMPSCI 1DM3"] },
        { count: 1, from: ["COMPSCI 1MD3", "MATH 1MP3"] },
        { count: 1, from: ["COMPSCI 1XC3", "COMPSCI 1XD3"] }
    ]
},
{
    id: "?HMATHSTAT",
    name: "Honours Mathematics & Statistics",
    slug: "honours-mathematics-and-statistics",
    requirements: [
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
        { count: 1, from: ["MATH 1B03"] },
    ]
},
{
    id: "HMATHSTATM",
    name: "Honours Mathematics & Statistics — Mathematics Sub-Plan",
    slug: "onours-mathematics-and-statistics-mathematics-sub-plan",
    requirements: [
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
        { count: 1, from: ["MATH 1B03"] },
    ]
},
{
    id: "HMATHSTATS",
    name: "Honours Mathematics and Statistics — Statistics Sub-Plan",
    slug: "honours-mathematics-and-statistics-statistics-sub-plan",
    requirements: [
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
        { count: 1, from: ["MATH 1B03"] },
    ]
},
{
    id: "HMATHPHYS",
    name: "Honours Mathematics and Physics",
    slug: "honours-mathematics-and-physics",
    requirements: [
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
        { count: 1, from: ["MATH 1B03"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 1, from: ["PHYSICS 1AA3", "PHYSICS 1CC3"] },
        { count: 1, from: scienceOneCourseList }
    ]
},
{
    id: "HMEDBIPHY",
    name: "Honours Medical and Biological Physics",
    slug: "honours-medical-and-biological-physics",
    requirements: [
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 1, from: ["PHYSICS 1AA3", "PHYSICS 1CC3", "BIOPHYS 1S03", "LIFESCI 1D03"] },
        { count: 1, from: ["CHEM 1A03"] },
        { count: 1, from: ["BIOLOGY 1A03", "CHEM 1AA3", "MATH 1B03"] },
        { count: 2, from: scienceOneCourseList }
    ]
},
{
    id: "HMOLEBIOL",
    name: "Honours Molecular Biology and Genetics Research Specialization",
    slug: "honours-molecular-biology-and-genetics-research-specialization",
    requirements: [
        { count: 2, from: ["BIOLOGY 1M03", "BIOLOGY 1A03"] },
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 2, from: scienceOneCourseList }
    ]
},
{
    id: "HNEUROSCI",
    name: "Honours Neuroscience",
    slug: "honours-neuroscience",
    requirements: [
        { count: 2, from: ["BIOLOGY 1M03", "BIOLOGY 1A03"] },
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 1, from: ["PSYCH 1XX3", "PSYCH 1FF3"] },
        { count: 1, from: ["MATH 1AA3", "MATH 1B03", "MATH 1LT3", "MATH 1MP3", "COMPSCI 1MD3"] }
    ]
},
{
    id: "HPHYSICS",
    name: "Honours Physics",
    slug: "honours-physics",
    requirements: [
        { count: 1, from: firstTermMath },
        { count: 1, from: secondTermMath },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 1, from: ["PHYSICS 1AA3", "PHYSICS 1CC3"] },
        { count: 1, from: ["CHEM 1A03"] },
        { count: 3, from: scienceOneCourseList }
    ]
},
{
    id: "HPSYCNEBE",
    name: "Honours Psychology, Neuroscience & Behaviour",
    slug: "honours-pnb",
    requirements: [
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 1, from: ["PSYCH 1FF3", "PSYCH 1XX3"] },
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 1, from: scienceOneCourseList }
    ]
},
{
    id: "HPSYCNEBEM",
    name: "Honours Psychology, Neuroscience & Behaviour – Mental Health Specialization",
    slug: "Honours Psychology, Neuroscience & Behaviour – Mental Health Specialization",
    requirements: [
        { count: 1, from: ["PSYCH 1FF3", "PSYCH 1XX3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 1, from: ["BIOPHYS 1S03", "CHEM 1A03", "PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 3, from: scienceOneCourseList }
    ]
},
{
    id: "HPSYCNEBEC",
    name: "Honours Psychology, Neuroscience & Behaviour – Music Cognition Specialization",
    slug: "honours-pnb-music-cognition-specialization",
    requirements: [
        { count: 1, from: ["PSYCH 1FF3", "PSYCH 1XX3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 2, from: ["BIOLOGY 1A03", "BIOLOGY 1M03"] },
        { count: 1, from: ["BIOPHYS 1S03", "CHEM 1A03", "PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 2, from: scienceOneCourseList },
        { count: 1, from: ["MUSIC 1A03", "MUSIC 1AA3"] },
    ]
},
{
    id: "?HSUSCHEM",
    name: "Honours Sustainable Chemistry",
    slug: "honours-sustainable-chemistry",
    requirements: [
        { count: 2, from: ["CHEM 1A03", "CHEM 1AA3"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3", "MATH 1MM3", "MATH 1X03"] },
        { count: 2, from: scienceOneCourseList }
    ]
},
{
    id: "LIFESCIENC",
    name: "Life Sciences",
    slug: "life-sciences",
    requirements: [
        { count: 1, from: ["BIOLOGY 1A03"] },
        { count: 1, from: ["CHEM 1A03"] },
        { count: 1, from: ["MATH 1A03", "MATH 1LS3"] },
        { count: 1, from: ["PHYSICS 1A03", "PHYSICS 1C03"] },
        { count: 1, from: ["BIOLOGY 1M03", "EARTHSC 1G03", "ENVIRSC 1C03", "PSYCH 1FF3", "PSYCH 1XX3"] },
        { count: 3, from: scienceOneCourseList }
    ]
},
{
    id: "?HMATHSCIS",
    name: "Mathematical Sciences",
    slug: "mathematical-sciences",
    requirements: [
        { count: 2, from: [...firstTermMath, ...secondTermMath] },
        { count: 1, from: ["COMPSCI 1MD3", "MATH 1B03", "MATH 1MP3"]}
    ]
}
];

export default programs;