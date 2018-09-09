const FRAMEWORKS = ["asp.net", ".net", "ruby on rails", "laravel", "vuejs", "vue.js", "angular js", "angularjs", "angular 2+", "angular 2", "angular 4", "angular 5", "angular 6", "express", "twig", "rabbit", "cocoa", "node.js", "node", "reactjs", "react.js", "react native"];

const SOFTWARE = ["mathematica", "posegresql", "mysql", "saltstack", "puppet", "ansible", "elasticsearch", "kibana", "spark", "hadoop", "mongodb", "databricks", "redis", "cassandra", "voldemort", "google cloud", "kubernetes"];

const LIBRARIES = ["opengl", "babel", "redux", "bootstrap", "jquery", "requirejs", "backbone", "glue"];

const TOOLS = ["git", "bash", "curl", "mocha", "chai", "amazon web services", "aws", "jira", "gulp", "grunt", "composer", "pip", "npm", "yarn", "pimple", "docker", "wordpress", "google analytics", "redshift", "snowflake", "kinesis"];

const CONCEPTS = ["mvc", "nosql", "restful api", "caches", "failover", "cloud", "architectural patterns", "open source", "object-oriented", "agile", "scrum", "databases", "software engineering", "data structures", "algorithms", "ux", "user experience", "qa", "quality assurance", "web dev", "graphics", "mockup", "prototype", "scalable", "infrastructure", "automation", "scripting", "continuous delivery", "distributed systems", "asynchronous", "cross-browser", "design", "maintainability", "hardware acceleration", "machine learning", "neural networks", "optimization", "networking"];

const PERSONAL_CHARACTERISTICS = ["english", "mandarin", "hindi", "self-driven", "self directed", "technical leadership", "security", "work ethic", "independently learn", "persistent", "dependable", "communicate", "critical thinking", "identify issues", "formulate solutions", "self starter", "eager", "active listening", "constructive feedback", "detail oriented", "interpersonal skills", "social media"];

// To merge: (c, c,) (objective-c, obj-c) ( go , go,) scala, javascript and the ecma scripts
const LANGUAGES = ["c++", "c#", "objective-c", "obj-c", " c ", " c,", "visual basic", "assembly", "f#", "cfml", "lisp", "fortran", " go ", " go,", "golang", "haskell", "javascript", "js", "java", " scala ", " scala,", "matlab", "julia", "lingo", "pascal", "ecmascript", "es2015", "es6", "ocaml", "perl", "php", "python", "ruby", "rust", "scheme", "swift", "xml", "html", "css", "json", "kotlin", "typescript", "coffeescript", "sql", "sass", "less", "jasmine"];

// Note: Spaces and commas will automatically be filtered out when applying to map, so don't correct for those
const MERGE = [{category: "Frameworks", changes: [["asp.net", ".net"], ["vue.js", "vuejs"], ["angularjs", "angular js"], ["angular 2+", "angular 2", "angular 4", "angular 5", "angular 6"], ["node.js", "node"], ["react.js", "reactjs"]]}, {category: "Languages", changes: [["objective-c", "obj-c"], ["go", "golang"], ["javascript", "js", "ecmascript", "es2015", "es6"]]}]

const TECH_TERMS = [{name: "Frameworks", data: FRAMEWORKS}, {name: "Software", data: SOFTWARE}, {name: "Libraries", data: LIBRARIES}, {name: "Tools", data: TOOLS}, {name: "Concepts", data: CONCEPTS}, {name: "Personal Characteristics", data: PERSONAL_CHARACTERISTICS}, {name: "Languages", data: LANGUAGES}];

export { TECH_TERMS, MERGE }


//TODO: actually, give each words tags? or is this good enough?
