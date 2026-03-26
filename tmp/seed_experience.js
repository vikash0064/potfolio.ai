
import mongoose from 'mongoose';

const MONGODB_URI = 'mongodb+srv://potfolio:123@potfolio.lacpsic.mongodb.net/?appName=potfolio';

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: String,
  description: String,
  is_active: { type: Boolean, default: true },
  order_index: { type: Number, default: 0 },
  deleted_at: { type: Date, default: null }
});

const Experience = mongoose.model('Experience', experienceSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB');

    const newExperiences = [
      {
        company: "Webingix",
        role: "Internship",
        duration: "3 month",
        description: "Engaged in real-world projects and professional software development workflows.",
        order_index: 2
      },
      {
        company: "Cipherschool",
        role: "Intern",
        duration: "2 month",
        description: "Focusing on core programming concepts and collaborative team tasks.",
        order_index: 3
      }
    ];

    for (const exp of newExperiences) {
      const exists = await Experience.findOne({ company: exp.company, role: exp.role });
      if (!exists) {
        await Experience.create(exp);
        console.log(`Added: ${exp.company}`);
      } else {
        console.log(`Exists: ${exp.company}`);
      }
    }

    await mongoose.disconnect();
    console.log('Seeding complete');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
