import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Limpa posts existentes
  await prisma.blogPost.deleteMany({});
  
  // Blog Posts com as 7 postagens originais
  await prisma.blogPost.create({
    data: {
      slug: "acelerando-o-portfolio-nextjs-com-ia",
      title: "Acelerando o Desenvolvimento de Portfólio Next.js com IA",
      excerpt: "Como a inteligência artificial pode acelerar significativamente o desenvolvimento de portfólios modernos com Next.js.",
      content: "A era da inteligência artificial chegou ao desenvolvimento web de forma definitiva, e não há melhor momento para explorar como essas ferramentas podem revolucionar a criação de portfólios profissionais. O Next.js se consolidou como uma das principais escolhas para desenvolvimento React, oferecendo renderização híbrida, otimizações automáticas e uma experiência de desenvolvedor excepcional. Quando combinamos essa robustez tecnológica com o poder da IA, o resultado é um fluxo de trabalho exponencialmente mais eficiente.",
      image: "/neural.svg",
      author: "Dayvson Marques",
      tags: JSON.stringify(["Next.js", "IA", "Desenvolvimento", "Portfólio"]),
      published: true
    }
  });

  await prisma.blogPost.create({
    data: {
      slug: "melhorando-performance-aplicacoes-web",
      title: "Melhorando a Performance de Aplicações Web Modernas",
      excerpt: "Estratégias avançadas e práticas comprovadas para otimizar a performance de aplicações web modernas.",
      content: "A performance web não é apenas sobre números - é sobre criar experiências que mantêm os usuários engajados e satisfeitos. As Core Web Vitals introduzidas pelo Google revolucionaram como medimos e priorizamos a performance. LCP, FID e CLS não são apenas métricas - são indicadores diretos de como os usuários percebem a qualidade da nossa aplicação.",
      image: "/circuit.svg",
      author: "Dayvson Marques",
      tags: JSON.stringify(["Performance", "Web Vitals", "Otimização", "UX"]),
      published: true
    }
  });

  await prisma.blogPost.create({
    data: {
      slug: "introducao-ao-javascript",
      title: "Introdução Completa ao JavaScript Moderno",
      excerpt: "Um guia abrangente sobre JavaScript moderno, cobrindo ES6+, async/await, módulos, e as melhores práticas.",
      content: "JavaScript evoluiu dramaticamente nos últimos anos, transformando-se de uma linguagem simples para manipulação de DOM em uma plataforma robusta para desenvolvimento full-stack. O ES6 marcou um divisor de águas na linguagem, introduzindo recursos como arrow functions, destructuring, template literals e classes.",
      image: "/window.svg",
      author: "Dayvson Marques",
      tags: JSON.stringify(["JavaScript", "ES6+", "Programação", "Frontend"]),
      published: true
    }
  });

  await prisma.blogPost.create({
    data: {
      slug: "guia-completo-react",
      title: "Guia Completo do React: Hooks, Context e Patterns",
      excerpt: "Domine o React moderno com hooks, context API, patterns avançados e melhores práticas para aplicações escaláveis.",
      content: "React transcendeu sua origem como biblioteca de UI para se tornar um ecossistema completo que redefine como construímos interfaces de usuário. A introdução dos Hooks em 2018 foi mais que uma nova feature - foi uma revolução conceitual que mudou fundamentalmente como pensamos sobre estado e efeitos colaterais em componentes.",
      image: "/globe.svg",
      author: "Dayvson Marques",
      tags: JSON.stringify(["React", "Hooks", "Frontend", "Desenvolvimento"]),
      published: true
    }
  });

  await prisma.blogPost.create({
    data: {
      slug: "typescript-para-javascript",
      title: "TypeScript para Desenvolvedores JavaScript: Além do Básico",
      excerpt: "Mergulhe profundamente em TypeScript avançado: generics, utility types, decorators e migração de projetos.",
      content: "TypeScript não é apenas JavaScript com tipos - é uma linguagem que eleva JavaScript a um novo patamar de robustez e produtividade. O sistema de tipos do TypeScript vai muito além de anotações básicas. Generics permitem criar código reutilizável e type-safe simultaneamente.",
      image: "/mangrove-circuit.svg",
      author: "Dayvson Marques",
      tags: JSON.stringify(["TypeScript", "JavaScript", "Tipos", "Desenvolvimento"]),
      published: true
    }
  });

  await prisma.blogPost.create({
    data: {
      slug: "design-systems-componentes",
      title: "Design Systems e Desenvolvimento de Componentes Reutilizáveis",
      excerpt: "Como construir design systems robustos que escalam com sua organização, desde tokens até componentes complexos.",
      content: "Design systems revolucionaram como organizações abordam consistency e scalability em produtos digitais. Mais que uma coleção de componentes, um design system é uma filosofia que alinha design, desenvolvimento e negócio em torno de uma linguagem visual comum.",
      image: "/file.svg",
      author: "Dayvson Marques",
      tags: JSON.stringify(["Design System", "Componentes", "UI/UX", "Frontend"]),
      published: true
    }
  });

  await prisma.blogPost.create({
    data: {
      slug: "arquitetura-frontend-moderna",
      title: "Arquitetura Frontend Moderna: Micro-frontends e Módulos",
      excerpt: "Explore arquiteturas frontend escaláveis: micro-frontends, module federation, e estratégias para aplicações enterprise.",
      content: "A complexidade das aplicações frontend modernas demanda arquiteturas que vão além da tradicional Single Page Application monolítica. Micro-frontends emergiram como solução para organizações que precisam escalar tanto tecnicamente quanto organizacionalmente.",
      image: "/mangue-circuit.svg",
      author: "Dayvson Marques",
      tags: JSON.stringify(["Arquitetura", "Micro-frontends", "Módulos", "Escalabilidade"]),
      published: true
    }
  });

  console.log('✅ Seed completed successfully with 7 blog posts!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });