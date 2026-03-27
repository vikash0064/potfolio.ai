export const blogs = [
    {
        id: "this-call-apply-bind",
        slug: "this-call-apply-bind-javascript",
        title: "The Magic of this, call(), apply(), and bind() in JavaScript",
        excerpt: "Understand how 'this' works in JavaScript and how to control it using call, apply, and bind with simple real-world analogies.",
        cover_image: "/blog images/4b1cabce-bfc2-468a-896a-2f346fd4acb4.png",
        published_at: "2026-03-15T00:00:00.000Z",
        reading_time: 5,
        views: 7,
        featured: true,
        content: JSON.stringify({
            type: "doc",
            content: [
                { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Introduction" }] },
                { type: "paragraph", content: [{ type: "text", text: "Imagine you’re at a party where several people are introducing themselves. The word 'this' works in a very similar way. It basically means: “Who is talking right now?”" }] },
                { type: "codeBlock", attrs: { language: "javascript" }, content: [{ type: "text", text: "const person = {\n  name: \"Rahul\",\n  greet: function() {\n    console.log(\"Hello, I am \" + this.name);\n  }\n};\nperson.greet();" }] }
            ]
        })
    },
    {
        id: "function-declaration-vs-expression",
        slug: "function-declaration-vs-expression-javascript",
        title: "Function Declaration vs Function Expression: What’s the Difference?",
        excerpt: "Learn the differences between function declarations and expressions, hoisting, and which one to use in your JavaScript code using a simple pizza shop analogy.",
        cover_image: "/blog images/c7bc85b0-5e32-4a48-bb2f-420ab90af7c7 (1).png",
        published_at: "2026-03-15T00:00:00.000Z",
        reading_time: 5,
        views: 3,
        featured: true,
        content: JSON.stringify({
            type: "doc",
            content: [
                { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Introduction - A Pizza Shop Analogy" }] },
                { type: "paragraph", content: [{ type: "text", text: "Imagine you run a small pizza shop. Function declarations are like recipes on the wall. Function expressions are like recipes in a notebook." }] },
                { type: "codeBlock", attrs: { language: "javascript" }, content: [{ type: "text", text: "function multiply(a, b) { return a * b; }\nconst multiply = function(a, b) { return a * b; };" }] }
            ]
        })
    },
    {
        id: "arrow-functions-javascript",
        slug: "arrow-functions-javascript-simpler-way",
        title: "Arrow Functions in JavaScript: A Simpler Way to Write Functions",
        excerpt: "Learn how arrow functions simplify your code, implicit vs explicit returns, and how they compare to traditional functions.",
        cover_image: "/blog images/816659aa-da95-4290-bc6a-cc8d599e0f49.png",
        published_at: "2026-03-15T00:00:00.000Z",
        reading_time: 5,
        views: 5,
        featured: true,
        content: JSON.stringify({
            type: "doc",
            content: [
                { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Introduction" }] },
                { type: "paragraph", content: [{ type: "text", text: "Think of arrow functions as the text-message version of functions: shorter, faster, and to the point." }] }
            ]
        })
    },
    {
        id: "array-methods-must-know",
        slug: "array-methods-must-know-javascript",
        title: "Array Methods You Must Know",
        excerpt: "Manage your data easily with these essential JavaScript array methods: push, pop, shift, map, filter, and reduce using a fruit shop analogy.",
        cover_image: "/blog images/1a725536-54d0-4629-919d-1502b6083bb9.png",
        published_at: "2026-03-15T00:00:00.000Z",
        reading_time: 6,
        views: 1,
        featured: true,
        content: JSON.stringify({
            type: "doc",
            content: [
                { type: "heading", attrs: { level: 2 }, content: [{ type: "text", text: "Introduction - A Fruit Shop Analogy" }] },
                { type: "paragraph", content: [{ type: "text", text: "Imagine you’re running a small fruit shop. Array methods are like smart assistants that manage your crates of fruits for you." }] },
                { type: "paragraph", content: [{ type: "text", text: "push() adds to the end, pop() removes from the end. map() transforms everything, and filter() picks only what you need." }] },
                { type: "codeBlock", attrs: { language: "javascript" }, content: [{ type: "text", text: "let fruits = [\"Apple\", \"Banana\"];\nfruits.push(\"Orange\");\n\nlet doubled = [1, 2, 3].map(n => n * 2);" }] }
            ]
        })
    }
];
