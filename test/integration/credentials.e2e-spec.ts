import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import * as request from 'supertest';
import { PrismaModule } from '../../src/prisma/prisma.module';
import { PrismaService } from '../../src/prisma/prisma.service';


describe('Credentials /credentials (e2e)', () => {
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

  it('/credentials (POST) => Should return 201 if user is created',async () => {
    const user = await prisma.users.create({
        data: {
          email: 'marcelo@teste.com',
          password: 'Marcelo1234.',
        },
      });
     const body = {
        title : 'title',
        url: 'www.marcelo.teste.com',  
        username: 'marcelo',
        password: 'Marcelo1234.',
     }
      const response = await request(app.getHttpServer())
        .post('/credentials')
        .send(body)
        .expect(HttpStatus.CREATED);  
  });
  it('/credentials (POST) => Should return 400 if data is invalid', async () => {
    return request(app.getHttpServer())
      .post('/credentials')
      .send({
        title : 'title',
        url: 'www.marcelo.teste.com',  
        username: 'marcelo',
      })
      .expect(HttpStatus.BAD_REQUEST);
  })
  it('/credentials (POST) => Should return 409 if title already exists for the same user', async () => {
    const user = await prisma.users.create({
      data: {
        email: 'marcelo@teste.com',
        password: 'Marcelo1234.',
      },
    });
    const existingCredential = await prisma.credentials.create({
      data: {
        title: 'title',
        url: 'www.marcelo.teste.com',
        username: 'marcelo',
        password: 'Marcelo1234.',
        userId: user.id,
      },
    });
    return request(app.getHttpServer())
      .post('/credentials')
      .send({
        title: 'title',
        url: 'www.marcelo.teste.com',
        username: 'marcelo',
        password: 'Marcelo1234.',
      })
      .expect(HttpStatus.CONFLICT);
  });

})