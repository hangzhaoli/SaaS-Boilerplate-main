import { defineConfig } from 'checkly';

/**
 * See https://www.checklyhq.com/docs/cli/project-structure/
 */
const config = defineConfig({
  /* A human friendly name for your project */
  projectName: 'ZENO',
  /** A unique identifier for your project. We recommend using the (partial) URL or hostname of your site */
  logicalId: 'zeno-ai-marketplace',
  /* An optional URL to your Git repo */
  repoUrl: 'https://github.com/ixartz/SaaS-Boilerplate',
  /* Sets default values for Checks */
  checks: {
    /* A default for how often your Check should run in minutes */
    frequency: 10,
    /* Checkly data centers to run your Checks as monitors */
    locations: ['us-east-1', 'eu-west-1'],
    /* An optional array of tags to organize your Checks */
    tags: ['website', 'api'],
    /** The Checkly Runtime to use. Possible values 'node16', 'node18' and 'node20' */
    runtimeId: '2024.02',
    /* A glob pattern that matches the Checks inside your repo, see https://www.checklyhq.com/docs/cli/using-check-test-match/ */
    checkMatch: '**/__checks__/**/*.check.ts',
    browserChecks: {
      /* A glob pattern matches any Playwright .spec.ts files and automagically creates a Check for each of them. */
      testMatch: '**/__checks__/**/*.spec.ts',
    },
  },
  cli: {
    /* The default datacenter location to use when running npx checkly test */
    runLocation: 'eu-west-1',
    /* An array of default reporters to use when a reporter is not specified with the "--reporter" flag */
    reporters: ['list'],
  },
});

export default config;
