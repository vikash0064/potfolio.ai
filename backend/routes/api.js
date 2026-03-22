import express from 'express';
import { Project, Blog, Skill, Experience, AuditLog, Visitor, PageView } from '../models.js';

const router = express.Router();

// Helper to log audit
const logAudit = async (action, type, id, details) => {
  try {
    await new AuditLog({ action, entity_type: type, entity_id: id, details, user_email: 'admin' }).save();
  } catch(e) { console.error('Audit failed', e); }
};

// --- Projects ---
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find({ deleted_at: null }).sort('order_index');
    res.json(projects);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/projects', async (req, res) => {
  try {
    const proj = new Project(req.body);
    await proj.save();
    await logAudit('CREATE', 'Project', proj._id, { title: proj.title });
    res.json(proj);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    res.json(project);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/projects/:id', async (req, res) => {
  try {
    const proj = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    await logAudit('UPDATE', 'Project', proj._id, { title: proj.title });
    res.json(proj);
  } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/projects/:id', async (req, res) => {
  try {
    const proj = await Project.findByIdAndUpdate(req.params.id, { deleted_at: new Date() });
    await logAudit('SOFT_DELETE', 'Project', proj._id, { title: proj.title });
    res.json({ message: 'Deleted' });
  } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- Blogs ---
router.get('/blogs', async (req, res) => {
    try {
      const { search, limit, page, featured } = req.query;
      let filter = { status: 'published', deleted_at: null };
      if (search) filter.title = new RegExp(search, 'i');
      if (featured === 'true') filter.featured = true;

      const pLimit = parseInt(limit) || 10;
      const pPage = parseInt(page) || 1;

      const blogs = await Blog.find(filter)
        .sort({ publish_date: -1 })
        .limit(pLimit)
        .skip((pPage - 1) * pLimit);

      res.json(blogs); // The frontend expects array for mock-actions!
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/blogs', async (req, res) => {
    try {
      const blog = new Blog(req.body);
      await blog.save();
      await logAudit('CREATE', 'Blog', blog._id, { title: blog.title });
      res.json(blog);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/blogs/:idOrSlug', async (req, res) => {
    try {
      const isObjectId = req.params.idOrSlug.match(/^[0-9a-fA-F]{24}$/);
      let blog;
      if (isObjectId) {
         blog = await Blog.findById(req.params.idOrSlug);
      } else {
         blog = await Blog.findOne({ slug: req.params.idOrSlug });
         if(blog) {
             blog.views += 1;
             await blog.save();
         }
      }
      if(!blog) return res.status(404).json({error: 'Not found'});
      res.json(blog);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/blogs/:id', async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
      await logAudit('UPDATE', 'Blog', blog._id, { title: blog.title });
      res.json(blog);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/blogs/:id', async (req, res) => {
    try {
      const blog = await Blog.findByIdAndUpdate(req.params.id, { deleted_at: new Date() });
      await logAudit('SOFT_DELETE', 'Blog', blog._id, { title: blog.title });
      res.json({ message: 'Deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- Skills ---
router.get('/skills', async (req, res) => {
    try {
      const items = await Skill.find({ deleted_at: null }).sort('order_index');
      res.json(items);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/skills', async (req, res) => {
    try {
      const item = new Skill(req.body);
      await item.save();
      await logAudit('CREATE', 'Skill', item._id, { title: item.name });
      res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/skills/:id', async (req, res) => {
    try {
      const item = await Skill.findById(req.params.id);
      res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/skills/:id', async (req, res) => {
    try {
      const item = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
      await logAudit('UPDATE', 'Skill', item._id, { title: item.name });
      res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/skills/:id', async (req, res) => {
    try {
      const item = await Skill.findByIdAndUpdate(req.params.id, { deleted_at: new Date() });
      await logAudit('SOFT_DELETE', 'Skill', item._id, { title: item.name });
      res.json({ message: 'Deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- Experience ---
router.get('/experience', async (req, res) => {
    try {
      const items = await Experience.find({ deleted_at: null }).sort('order_index');
      res.json(items);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.post('/experience', async (req, res) => {
    try {
      const item = new Experience(req.body);
      await item.save();
      await logAudit('CREATE', 'Experience', item._id, { title: item.company });
      res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.get('/experience/:id', async (req, res) => {
    try {
      const item = await Experience.findById(req.params.id);
      res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.put('/experience/:id', async (req, res) => {
    try {
      const item = await Experience.findByIdAndUpdate(req.params.id, req.body, { new: true });
      await logAudit('UPDATE', 'Experience', item._id, { title: item.company });
      res.json(item);
    } catch (error) { res.status(500).json({ error: error.message }); }
});

router.delete('/experience/:id', async (req, res) => {
    try {
      const item = await Experience.findByIdAndUpdate(req.params.id, { deleted_at: new Date() });
      await logAudit('SOFT_DELETE', 'Experience', item._id, { title: item.company });
      res.json({ message: 'Deleted' });
    } catch (error) { res.status(500).json({ error: error.message }); }
});

// --- Admin System Endpoints ---
router.get('/admin/analytics', async (req, res) => {
    try {
        const views = await PageView.countDocuments({});
        const visitors = await Visitor.countDocuments({});
        res.json({ views, visitors, likes: 0 });
    } catch(err) { res.json({ views:0, visitors:0, likes:0 }); }
});

router.get('/admin/logs', async (req, res) => {
    try {
        const logs = await AuditLog.find({}).sort({createdAt: -1}).limit(50);
        res.json(logs);
    } catch(err) { res.json([]); }
});

router.get('/admin/trash', async (req, res) => {
    try {
        // Collect soft-deleted items
        const results = [];
        const addItems = (docs, type) => docs.forEach(d => results.push({ id: d.id, type, title: d.title || d.name || d.company, deleted_at: d.deleted_at }));
        
        addItems(await Project.find({ deleted_at: { $ne: null } }), 'projects');
        addItems(await Blog.find({ deleted_at: { $ne: null } }), 'blogs');
        addItems(await Skill.find({ deleted_at: { $ne: null } }), 'skills');
        addItems(await Experience.find({ deleted_at: { $ne: null } }), 'experience');

        // sort by newest delete
        results.sort((a,b) => new Date(b.deleted_at) - new Date(a.deleted_at));
        res.json(results);
    } catch(err) { res.json([]); }
});

router.post('/admin/restore', async (req, res) => {
    try {
        const { type, id } = req.body;
        let Model = { 'projects': Project, 'blogs': Blog, 'skills': Skill, 'experience': Experience }[type];
        if(!Model) return res.status(400).json({error: 'Invalid type'});
        
        const doc = await Model.findByIdAndUpdate(id, { deleted_at: null });
        await logAudit('RESTORE', type, id, { title: doc.title || doc.name || doc.company });
        res.json({ success: true });
    } catch(err) { res.status(500).json({error: err.message}); }
});

router.delete('/admin/trash/:type/:id', async (req, res) => {
    try {
        const { type, id } = req.params;
        let Model = { 'projects': Project, 'blogs': Blog, 'skills': Skill, 'experience': Experience }[type];
        if(!Model) return res.status(400).json({error: 'Invalid type'});
        
        await Model.findByIdAndDelete(id);
        await logAudit('HARD_DELETE', type, id, {});
        res.json({ success: true });
    } catch(err) { res.status(500).json({error: err.message}); }
});

export default router;
