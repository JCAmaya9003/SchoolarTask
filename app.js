import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import userRoutes from './src/routes/user-routes.js';
import oauthRoutes from './src/routes/oauth-routes.js';
import { conexionDB } from './src/config/database.js';
import roleRoutes from './src/routes/role.routes.js'
import parentRoutes from './src/routes/parent.routes.js'
import gradeSectionRoutes from './src/routes/gradeSection.routes.js'
import subjectRoutes from './src/routes/subject.routes.js'
import evaluationRoutes from './src/routes/evaluation.routes.js'
import studentRoutes from './src/routes/student.routes.js'
import newsRoutes from './src/routes/news.routes.js'
import teacherRouter from './src/routes/teacher.routes.js'
import evaluation_gradeRouter from './src/routes/evaluation_grade.routes.js'
import academic_placeRouter from './src/routes/academic_place.routes.js'
import reservartionRouter from './src/routes/reservation.routes.js'
import { config } from './src/config/config.js';

const app = express();
const PORT = process.env.PORT || 3000;
conexionDB();

// Redirect HTTP to HTTPS in production environment
if (process.env.NODE_ENV === 'production') {
    app.use(function (req, res, next) {
        if (req.headers['x-forwarded-proto'] !== 'https') {
            return res.redirect('https://' + req.headers.host + req.url);
        }
        return next();
    });
}

// CORS middleware
app.use(cors({
    origin: config.frontUrl,  // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,        // Allow cookies to be sent with requests
}));

// Middleware for cookie parsing and JSON body parsing
app.use(cookieParser());
app.use(express.json());

// Define your routes here
app.use('/api/users', userRoutes);
app.use('/oauth', oauthRoutes);
app.use('/api/roles', roleRoutes);
app.use('/api/parents', parentRoutes);
app.use('/api/gradeSections', gradeSectionRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/evaluations', evaluationRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/teachers', teacherRouter);
app.use('/api/evaluation_grades', evaluation_gradeRouter);
app.use('/api/academic_places', academic_placeRouter);
app.use('/api/reservations', reservartionRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));