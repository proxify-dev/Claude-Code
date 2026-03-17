import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://proxify-dev.github.io',
  base: '/Claude-Code',
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
            { label: 'Installation', link: '/getting-started/installation/' },
            { label: 'First Session', link: '/getting-started/first-session/' },
            { label: 'Key Concepts', link: '/getting-started/key-concepts/' },
            { label: 'Quick Wins', link: '/getting-started/quick-wins/' },
          ],
        },
        {
          label: 'Guides',
          items: [
            { label: 'Writing CLAUDE.md', link: '/guides/claude-md/' },
            { label: 'Workflow Patterns', link: '/guides/workflow-patterns/' },
            { label: 'Context Management', link: '/guides/context-management/' },
            { label: 'Effective Prompting', link: '/guides/effective-prompting/' },
            { label: 'Agentic Engineering', link: '/guides/agentic-engineering/' },
          ],
        },
        {
          label: 'Skills',
          items: [
            { label: 'Overview', link: '/skills/overview/' },
            { label: 'Using Skills', link: '/skills/using-skills/' },
            { label: 'Creating Skills', link: '/skills/creating-skills/' },
            { label: 'Distributing Skills', link: '/skills/distributing-skills/' },
          ],
        },
        {
          label: 'Agents',
          items: [
            { label: 'Overview', link: '/agents/overview/' },
            { label: 'Creating Agents', link: '/agents/creating-agents/' },
            { label: 'Agent Patterns', link: '/agents/patterns/' },
          ],
        },
        {
          label: 'Reference',
          items: [
            { label: 'Glossary', link: '/reference/glossary/' },
            { label: 'Links & Resources', link: '/reference/links/' },
            { label: 'Common Pitfalls', link: '/reference/common-pitfalls/' },
          ],
        },
      ],
    }),
  ],
});
