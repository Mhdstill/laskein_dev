import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { simpleParser } from 'mailparser';
import * as Imap from 'node-imap';

@Injectable()
export class EmailService {
  @Inject(ConfigService)
  public config: ConfigService;

  // private readonly imapConfig = {
  //   user: 'soandroniriela@gmail.com',
  //   password: 'vwylsyjfikyayljp',
  //   host: 'imap.gmail.com',
  //   port: 993,
  //   tls: true,
  // };

  async findAll(page = 1, pageSize = 10): Promise<any> {
    const imap = new Imap({
      user: this.config.get('MAIL_FROM'),
      password: this.config.get('MAIL_PASSWORD'),
      host: 'imap.gmail.com',
      port: 993,
      tls: true,
    });

    return new Promise((resolve, reject) => {
      imap.once('ready', () => {
        imap.openBox('INBOX', true, (err, box) => {
          if (err) {
            reject(err);
            return;
          }

          const start = Math.max(1, box.messages.total - (page - 1) * pageSize);
          const end = Math.min(
            box?.messages?.total,
            box?.messages?.total - (page - 1) * pageSize + pageSize,
          );

          const fetch = imap.seq.fetch(`${start}:${end}`, {
            bodies: '',
          });

          const emailPromises = [];

          fetch.on('message', (msg) => {
            const emailPromise = new Promise(async (resolveEmail) => {
              // Lire le flux en tant que chaîne de texte
              const chunks = [];
              msg.on('body', (stream) => {
                stream.on('data', (chunk) => {
                  chunks.push(chunk);
                });
              });

              msg.once('end', async () => {
                const text = Buffer.concat(chunks).toString('utf8');
                const parsedEmail = await simpleParser(text);

                const sender = parsedEmail.from.text; // Utilisez la propriété correcte de l'expéditeur

                resolveEmail({
                  sender,
                  email: parsedEmail,
                });
              });
            });

            emailPromises.push(emailPromise);
          });

          fetch.once('end', async () => {
            // Attendre que toutes les promesses d'e-mails soient résolues
            const resolvedEmails = await Promise.all(emailPromises);

            // Grouper les e-mails par expéditeur
            const emailsBySender = new Map<string, any[]>();

            resolvedEmails.forEach(({ sender, email }) => {
              if (!emailsBySender.has(sender)) {
                emailsBySender.set(sender, []);
              }

              emailsBySender.get(sender).push(email);
            });

            // Convertir la structure Map en tableau de groupes
            const groupedEmails = Array.from(
              emailsBySender,
              ([sender, emails]) => ({
                sender,
                emails,
              }),
            );

            // Terminer la connexion IMAP
            imap.end();

            // Résoudre la promesse principale avec les e-mails groupés
            resolve(groupedEmails);
          });
        });
      });

      imap.once('error', (err) => {
        reject(err);
      });

      imap.connect();
    });
  }
}
