// https://vue-test-utils.vuejs.org/guides/testing-single-file-components-with-jest.html
module.exports = {
    moduleFileExtensions: [
        'js',
        'jsx',
        'json',
        'vue'
    ],
    transform: {
        '^.+\\.vue$': 'vue-jest',
        '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
        '^.+\\.jsx?$': 'babel-jest',
        // process js with `babel-jest`
        '^.+\\.js$': '<rootDir>/node_modules/babel-jest'
    },
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
    },
    snapshotSerializers: [
        'jest-serializer-vue'
    ],
    testMatch: [
        '**/tests/unit/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
    ],
    testURL: 'http://localhost/',
    collectCoverage: true,
    coverageReporters: ['html' /* ,'text-summary' */],
    collectCoverageFrom: [
        'src/**/*.{js,vue}',
        '!**/node_modules/**'
    ]
};
