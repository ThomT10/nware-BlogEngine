const express = require('express');
const app = express();
const port = 3000;

let categories = [];
let posts = [];

app.use(express.json());
app.use(express.static(__dirname));

app.post('/save-category', (req, res) => {
  const { title } = req.body;
  categories.push(title);
});

app.post('/update-category', (req, res) => {
    const { index, title } = req.body;
  
    if (categories[index] !== undefined) {
      categories[index] = title;
    }
  });

app.get('/categories', (req, res) => {
  if(categories){
    res.status(200).json(categories);
  }else{
    res.status(204).send();
  }
  
});

app.get('/categories/:id', (req, res) => {
    const categoryId = parseInt(req.params.id); 

    if(categories[categoryId]){
        res.json(categories[categoryId]);
    }else{
        res.status(404).send();
    }
  });


app.post('/save-post', (req, res) => {
    const { title, category, pubDate, content } = req.body;
    posts.push({ title, category, pubDate, content });
    });

app.post('/update-post', (req, res) => {
    const { index, title, category, pubDate, content } = req.body;
  
    if (posts[index] !== undefined) {
      posts[index] = { title, category, pubDate, content };
    }
  });

app.get('/posts', (req, res) => {
    if(posts){
        res.status(200).json(posts);
    }else{
        res.status(204).send();
    }
  });

app.get('/posts/:id', (req, res) => {
    const postsId = parseInt(req.params.id); 

    if(posts[postsId]){
        res.status(200).json(posts[postsId]);
    }else{
        res.status(404).send();
    }
    
  });


app.get('/categories/:id/posts', (req, res)=>{
    const categoryId = parseInt(req.params.id);

    if (categoryId >= 0 && categoryId < categories.length) {
        const category = categories[categoryId];
        const categoryPosts = posts.filter(post => post.category === category);

        res.status(200).json(categoryPosts);
    } else {
        res.status(204).send();
    }
})


app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});