import mongoose from 'mongoose';

const transformResource = (doc, ret) => {
  ret.id = ret._id.toString();
  delete ret._id;
  delete ret.__v;
};

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  tags: [String],
  image: String,
  link: String,
  github: String,
  order_index: { type: Number, default: 0 },
  deleted_at: { type: Date, default: null }
}, { timestamps: true, toJSON: { transform: transformResource } });

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  excerpt: String,
  cover_image: String,
  content: String,
  views: { type: Number, default: 0 },
  reading_time: Number,
  featured: { type: Boolean, default: false },
  status: { type: String, default: 'published' },
  publish_date: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null }
}, { timestamps: true, toJSON: { transform: transformResource } });

const skillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: String,
  icon: String,
  order_index: { type: Number, default: 0 },
  deleted_at: { type: Date, default: null }
}, { timestamps: true, toJSON: { transform: transformResource } });

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: String,
  description: String,
  is_active: { type: Boolean, default: true },
  order_index: { type: Number, default: 0 },
  deleted_at: { type: Date, default: null }
}, { timestamps: true, toJSON: { transform: transformResource } });

const auditLogSchema = new mongoose.Schema({
  action: String,
  entity_type: String,
  entity_id: String,
  details: mongoose.Schema.Types.Mixed,
  user_email: String,
}, { timestamps: true, toJSON: { transform: transformResource } });

const visitorSchema = new mongoose.Schema({
  ip_hash: String,
  user_agent: String,
  device_type: String,
  browser: String,
  os: String,
}, { timestamps: true, toJSON: { transform: transformResource } });

const pageViewSchema = new mongoose.Schema({
  path: String,
  visitor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Visitor' },
  referrer: String,
  duration: Number,
}, { timestamps: true, toJSON: { transform: transformResource } });

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'admin' }
}, { timestamps: true, toJSON: { transform: transformResource } });

projectSchema.index({ order_index: 1, deleted_at: 1 });
blogSchema.index({ publish_date: -1, status: 1, deleted_at: 1 });
skillSchema.index({ order_index: 1, deleted_at: 1 });

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  issuer: String,
  date: String,
  image: String,
  link: String,
  order_index: { type: Number, default: 0 },
  deleted_at: { type: Date, default: null }
}, { timestamps: true, toJSON: { transform: transformResource } });

export const Project = mongoose.model('Project', projectSchema);
export const Blog = mongoose.model('Blog', blogSchema);
export const Skill = mongoose.model('Skill', skillSchema);
export const Experience = mongoose.model('Experience', experienceSchema);
export const Certificate = mongoose.model('Certificate', certificateSchema);
export const AuditLog = mongoose.model('AuditLog', auditLogSchema);
export const Visitor = mongoose.model('Visitor', visitorSchema);
export const PageView = mongoose.model('PageView', pageViewSchema);
export const User = mongoose.model('User', userSchema);
