module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "node": true
    },
    "extends": "airbnb",
    "installedESLint": true,
    "parserOptions": {
        "ecmaFeatures": {
            "experimentalObjectRestSpread": true,
            "jsx": true,
            "es6": true
        },
        sourceType: "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "no-console": [
            "error",
            { "allow": ["warn", "error"] }
        ],
        "react/jsx-uses-vars": [
            2
        ],
        "react/no-unused-prop-types": [
            "error",
            { "skipShapeProps": true }
        ]
    }
};
