const FRAMEWORKS = ["asp.net", ".net", "ruby on rails", "laravel", "vuejs", "vue.js", "angular js", "angularjs", "angular 2+", "angular 2", "angular 4", "angular5", "angular6", "react native", "express", "twig", "rabbit", "cocoa"];

const SOFTWARE = ["mathematica", "posegresql", "mysql", "saltstack", "puppet", "ansible", "elasticsearch", "kibana", "spark", "hadoop", "mongodb", "databricks", "redis", "cassandra", "voldemort", "google cloud", "kubernetes"];

const LIBRARIES = ["opengl", "babel", "redux", "bootstrap", "jquery", "requirejs", "backbone", "react", "reactjs", "react.js", "glue"];

const TOOLS = ["git", "bash", "curl", "mocha", "chai", "amazon web services", "aws", "jira", "gulp", "grunt", "composer", "pip", "npm", "yarn", "pimple", "docker", "wordpress", "google analytics", "redshift", "snowflake", "kinesis"];

const CONCEPTS = ["mvc", "nosql", "restful api", "caches", "failover", "cloud", "architectural patterns", "open source", "object-oriented", "agile", "scrum", "databases", "software engineering", "data structures", "algorithms", "ux", "user experience", "qa", "quality assurance", "web dev", "graphics", "mockup", "prototype", "scalable", "infrastructure", "automation", "scripting", "continuous delivery", "distributed systems", "asynchronous", "cross-browser", "design", "maintainability", "hardware acceleration", "machine learning", "neural networks", "optimization", "networking"];

const PERSONAL_CHARACTERISTICS = ["english", "mandarin", "hindi", "self-driven", "self directed", "technical leadership", "security", "work ethic", "independently learn", "persistent", "dependable", "communicate", "critical thinking", "identify issues", "formulate solutions", "self starter", "eager", "active listening", "constructive feedback", "detail oriented", "interpersonal skills", "social media"];

// To merge: (c, c,) (objective-c, obj-c) ( go , go,) scala, javascript and the ecma scripts
const LANGUAGES = ["c++", "c#", "objective-c", "obj-c", " c ", " c,", "visual basic", "assembly", "f#", "cfml", "lisp", "fortran", " go ", " go,", "golang", "haskell", "javascript", "js", "java", " scala ", " scala,", "matlab", "julia", "lingo", "pascal", "ecmascript", "es2015", "es6", "ocaml", "perl", "php", "python", "ruby", "rust", "scheme", "swift", "xml", "html", "css", "json", "node", "node.js", "kotlin", "typescript", "coffeescript", "sql", "sass", "less", "jasmine"];

// Note: Spaces and commas will automatically be filtered out when applying to map, so don't correct for those
const MERGE = [["asp.net", ".net"], ["vuejs", "vue.js"], ["angularjs", "angular js"], ["angular 2+", "angular 2", "angular3", "angular 4", "angular 5", "angular 6"], ["amazon web services", "aws"], ["objective-c", "obj-c"], ["go", "golang"], ["javascript", "js", "ecmascript", "es2015", "es6"], ["node", "node.js"]];

const ORDER = ["Frameworks", "Software", "Libraries", "Tools", "Concepts", "Personal Characteristics", "Languages"];

const TECH_TERMS = [ORDER, FRAMEWORKS, SOFTWARE, LIBRARIES, TOOLS, CONCEPTS, PERSONAL_CHARACTERISTICS, LANGUAGES, MERGE];

export { TECH_TERMS, MERGE }


//TODO: actually, give each words tags? or is this good enough?
