import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { PrismaService } from '../../src/prisma/prisma.service';
import { async } from 'rxjs';

describe('User /auth e2e (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    prisma = app.get(PrismaService);
    await prisma.users.deleteMany();
    await prisma.notes.deleteMany();
    await prisma.credentials.deleteMany();
    await prisma.card.deleteMany();
    await app.init();
  });

  it('/singup (POST) => Should return 201 if user is created', () => {
    return request(app.getHttpServer())
      .post('/singup')
      .send({
        email: 'marcelo@teste.com',
        password: 'Marcelo1234.',
      })
      .expect(HttpStatus.CREATED);
  });
  it('/singup (POST) => Should return 409 if user already exists', async () => {
     await prisma.users.create({
      data: {
        email: 'marcelo@teste.com',
        password: 'Marcelo1234.',
      },
    });
    return request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'marcelo@teste.com',
        password: 'Marcelo1234.',
      })
      .expect(HttpStatus.CONFLICT);
  });
  it('/signup (POST) => Should return 400 if password is invalid', async () => {
    return request(app.getHttpServer())
      .post('/signup')
      .send({
        email: 'marcelo@teste.com',
        password: '123',
      })
      .expect(HttpStatus.BAD_REQUEST);
  });
  it('/signin (POST) => Should return 200 if user is available',async () => {
    await prisma.users.create({
      data: {
        email: 'marcelo@teste.com',
        password: 'Marcelo1234.',
      },
    })
    const {body} =  await request(app.getHttpServer())
      .post('/singin')
      .send({
        email: 'marcelo@teste.com',
        password: 'Marcelo1234.',
      })
      .expect(HttpStatus.OK);
      expect(body).toHaveProperty('token');
  });
  it('/signin (POST) => Should return 401 if user is not available', () => {
    return request(app.getHttpServer())
      .post('/singin')
      .send({
        email: 'marcelo@teste.com',
        password: 'Marcelo1234.',
      })
      .expect(HttpStatus.UNAUTHORIZED);
  })
});
