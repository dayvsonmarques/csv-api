import { PrismaClient } from '@prisma/client';
import { hash } from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // Permissões
  // Cria permissões se não existirem
  await prisma.permission.upsert({
    where: { name: 'admin' },
    update: {},
    create: { name: 'admin' }
  });
  await prisma.permission.upsert({
    where: { name: 'editor' },
    update: {},
    create: { name: 'editor' }
  });
  await prisma.permission.upsert({
    where: { name: 'viewer' },
    update: {},
    create: { name: 'viewer' }
  });

  // Grupos
  const adminGroup = await prisma.group.upsert({
    where: { name: 'Admin' },
    update: {},
    create: {
      name: 'Admin',
      permissions: {
        connect: [{ name: 'admin' }, { name: 'editor' }, { name: 'viewer' }]
      }
    }
  });
  const editorGroup = await prisma.group.upsert({
    where: { name: 'Editor' },
    update: {},
    create: {
      name: 'Editor',
      permissions: {
        connect: [{ name: 'editor' }, { name: 'viewer' }]
      }
    }
  });
  const viewerGroup = await prisma.group.upsert({
    where: { name: 'Viewer' },
    update: {},
    create: {
      name: 'Viewer',
      permissions: {
        connect: [{ name: 'viewer' }]
      }
    }
  });

  // Usuário admin
  const password = await hash('admin123', 10);
  await prisma.user.upsert({
    where: { email: 'admin@admin.com' },
    update: {},
    create: {
      name: 'Administrador',
      email: 'admin@admin.com',
      password,
      groupId: adminGroup.id
    }
  });

  // Usuário editor
  await prisma.user.upsert({
    where: { email: 'editor@editor.com' },
    update: {},
    create: {
      name: 'Editor',
      email: 'editor@editor.com',
      password: await hash('editor123', 10),
      groupId: editorGroup.id
    }
  });

  // Usuário viewer
  await prisma.user.upsert({
    where: { email: 'viewer@viewer.com' },
    update: {},
    create: {
      name: 'Viewer',
      email: 'viewer@viewer.com',
      password: await hash('viewer123', 10),
      groupId: viewerGroup.id
    }
  });

  console.log('Dados iniciais criados!');

  // Blog Posts
  const blogPosts = [
    {
      slug: 'acelerando-o-portfolio-nextjs-com-ia',
      title: 'Acelerando o portfólio Next.js com IA',
      excerpt: 'Como o Copilot acelerou o desenvolvimento do portfólio Next.js com sugestões inteligentes e integração fluida.',
      content: `Durante o desenvolvimento deste portfólio, o GitHub Copilot foi essencial para gerar componentes como Footer, Header e About. Ele sugeriu soluções para problemas de duplicidade, erros de JSX e até para estilização avançada com Tailwind CSS. A integração com Next.js e TypeScript ficou muito mais fluida, permitindo foco total na experiência do usuário e na criação de um site moderno e responsivo.

A cada etapa, o Copilot trouxe sugestões inteligentes para otimizar o tempo de desenvolvimento, desde a criação de rotas dinâmicas até a implementação de temas escuros e claros. O uso de Tailwind CSS foi potencializado pelas recomendações automáticas de classes e padrões de design, tornando o processo de estilização mais eficiente e consistente.

Além disso, a integração com ferramentas modernas como Next.js permitiu que o projeto fosse escalável e fácil de manter. O Copilot ajudou a evitar erros comuns de sintaxe e duplicidade, tornando o código mais limpo e eficiente. Essa assistência foi fundamental para acelerar o desenvolvimento sem comprometer a qualidade do código final.

O processo de refatoração foi acelerado graças às correções automáticas sugeridas pelo Copilot, especialmente em componentes como Footer e Header. A capacidade da IA de identificar padrões e sugerir melhorias transformou completamente a experiência de desenvolvimento.

A estilização avançada com Tailwind CSS trouxe gradientes, animações e responsividade, criando uma interface moderna e atraente. O uso de utilitários CSS permitiu criar layouts complexos sem escrever CSS customizado, mantendo o código organizado e fácil de manter.

A navegação entre páginas e a criação do menu Blog foram automatizadas, tornando a experiência do usuário mais fluida. O sistema de roteamento do Next.js, combinado com as sugestões do Copilot, resultou em uma navegação intuitiva e performática.

Por fim, o projeto se tornou um exemplo de como a inteligência artificial pode transformar o desenvolvimento web, tornando processos mais rápidos, eficientes e inovadores. A colaboração entre desenvolvedor e IA abriu novas possibilidades para criar aplicações web de alta qualidade com maior velocidade e precisão.`,
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80',
      tags: JSON.stringify(['Next.js', 'IA', 'Tailwind', 'Portfólio'])
    },
    {
      slug: 'refatoracao-inteligente-erros-comuns-e-solucoes',
      title: 'Refatoração inteligente: erros comuns e soluções',
      excerpt: 'Veja como o Copilot ajudou a identificar e corrigir duplicidades e erros de sintaxe em componentes React.',
      content: `Ao longo do projeto, enfrentei problemas de duplicidade e erros de JSX, especialmente no Footer. O Copilot sugeriu patches para remover imports duplicados, corrigir tags e garantir um componente limpo. Isso acelerou o processo de refatoração e garantiu que o código estivesse sempre funcional, eliminando horas de debugging manual e pesquisa em documentação.

A identificação de erros foi facilitada pelas sugestões automáticas do Copilot, que apontou inconsistências em componentes e rotas. O processo de correção tornou-se mais ágil e menos propenso a falhas, permitindo que o foco permanecesse na lógica de negócio ao invés de problemas técnicos menores. A IA conseguiu detectar padrões de erro antes mesmo que se tornassem problemas maiores.

A cada ajuste, o Copilot recomendava boas práticas de React e Next.js, melhorando a estrutura do projeto e a legibilidade do código. Essas sugestões incluíam otimizações de performance, padrões de componentização e estruturas de pastas mais eficientes. O resultado foi um código mais limpo, maintível e seguindo as melhores práticas da comunidade.

A estilização dos componentes foi aprimorada com Tailwind CSS, trazendo uniformidade visual e responsividade. O uso de classes utilitárias permitiu criar interfaces consistentes sem a necessidade de CSS customizado, reduzindo significativamente o tempo de desenvolvimento.

A navegação entre páginas foi simplificada com rotas dinâmicas e breadcrumbs, tornando o site mais intuitivo. O sistema de roteamento implementado garante uma experiência fluida para o usuário, com transições suaves e carregamento otimizado de páginas.

A refatoração de componentes legados foi transformada pela assistência da IA, que sugeriu melhorias estruturais e otimizações de performance. Problemas comuns como vazamentos de memória, re-renderizações desnecessárias e estruturas de estado ineficientes foram identificados e corrigidos automaticamente. Isso resultou em uma aplicação mais performática e estável.

Por fim, o aprendizado contínuo com a IA permitiu evoluir o projeto rapidamente, sempre com foco em qualidade e experiência do usuário. Cada interação com o Copilot trouxe novos insights sobre melhores práticas e padrões de desenvolvimento, acelerando significativamente a curva de aprendizado e a evolução técnica do projeto.`,
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      tags: JSON.stringify(['Refatoração', 'Erros', 'Copilot'])
    },
    {
      slug: 'tailwind-na-pratica-dicas-de-estilizacao-moderna',
      title: 'Tailwind na prática: dicas de estilização moderna',
      excerpt: 'Copilot sugeriu classes Tailwind para gradientes, responsividade e animações, tornando o visual moderno e fluido.',
      content: `A estilização do Footer e outros componentes foi facilitada pelo Copilot, que sugeriu classes Tailwind para gradientes, espaçamentos e animações. Isso permitiu criar uma interface moderna, responsiva e com transições suaves, sem perder tempo pesquisando na documentação. O resultado foi um design consistente e profissional que se adapta perfeitamente a diferentes dispositivos e resoluções.

O uso de Tailwind CSS trouxe agilidade na criação de layouts, com sugestões automáticas para espaçamentos, cores e efeitos visuais. A biblioteca de utilitários permitiu implementar designs complexos sem escrever CSS customizado, mantendo o código limpo e organizado. As classes semânticas facilitaram a manutenção e a colaboração entre designers e desenvolvedores.

A responsividade foi garantida por meio de breakpoints e utilitários do Tailwind, tornando o site acessível em diferentes dispositivos. O sistema de grid responsivo adaptou-se automaticamente a telas de smartphones, tablets e desktops, proporcionando uma experiência otimizada para cada tipo de dispositivo. As técnicas mobile-first garantiram performance e usabilidade em todos os cenários.

Animações e transições suaves foram implementadas com facilidade, graças às recomendações do Copilot. As microinterações adicionaram personalidade ao site, criando uma experiência mais envolvente e profissional. Efeitos hover, transições de página e animações de carregamento foram implementados com precisão.

O conteúdo técnico do blog foi automatizado, mostrando o potencial da IA para gerar textos relevantes e contextualizados. A geração inteligente de conteúdo garantiu que cada artigo fosse único, informativo e otimizado para SEO, mantendo a qualidade editorial em alto nível.

A paleta de cores foi cuidadosamente selecionada usando as ferramentas de design do Tailwind, criando um esquema visual harmonioso que reforça a identidade da marca. As cores foram escolhidas considerando acessibilidade, contraste e psicologia das cores, resultando em uma interface que é tanto bonita quanto funcional.

Por fim, a padronização visual elevou a experiência do usuário, tornando o portfólio mais profissional e atrativo. A combinação de Tailwind CSS com as sugestões inteligentes do Copilot resultou em um produto final que supera as expectativas em termos de qualidade visual e experiência do usuário.`,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      tags: JSON.stringify(['Tailwind', 'CSS', 'Design'])
    }
  ];

  for (const post of blogPosts) {
    await prisma.blogPost.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    });
  }

  console.log('Posts do blog criados!');
}

main().finally(() => prisma.$disconnect());
