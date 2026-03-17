import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  integrations: [
    starlight({
      title: 'Claude-Code',
      description: "Proxify's Claude Code acceleration toolkit",
      customCss: ['./src/styles/custom.css'],
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/proxify-dev/Claude-Code' },
      ],
      sidebar: [
        {
          label: 'Getting Started',
          items: [
            { label: 'Installation', slug: 'getting-started/installation' },
            { label: 'First Session', slug: 'getting-started/first-session' },
            { label: 'Key Concepts', slug: 'getting-started/key-concepts' },
            { label: 'Quick Wins', slug: 'getting-started/quick-wins' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Writing CLAUDE.md', slug: 'guides/claude-md' },
            { label: 'Workflow Patterns', slug: 'guides/workflow-patterns' },
            { label: 'Context Management', slug: 'guides/context-management' },
            { label: 'Effective Prompting', slug: 'guides/effective-prompting' },
            { label: 'Agentic Engineering', slug: 'guides/agentic-engineering' },
          ],
        },
        {
          label: 'Skills',
          items: [
            { label: 'Overview', slug: 'skills/overview' },
            { label: 'Using Skills', slug: 'skills/using-skills' },
            { label: 'Creating Skills', slug: 'skills/creating-skills' },
            { label: 'Distributing Skills', slug: 'skills/distributing-skills' },
          ],
        },
        {
          label: 'Agents',
          items: [
            { label: 'Overview', slug: 'agents/overview' },
            { label: 'Creating Agents', slug: 'agents/creating-agents' },
            { label: 'Agent Patterns', slug: 'agents/patterns' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Glossary', slug: 'reference/glossary' },
            { label: 'Links & Resources', slug: 'reference/links' },
            { label: 'Common Pitfalls', slug: 'reference/common-pitfalls' },
          ],
        },
      ],
    }),
  ],
});
