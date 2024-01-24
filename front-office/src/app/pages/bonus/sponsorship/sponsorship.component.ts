import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Clipboard } from '@angular/cdk/clipboard';

@Component({
  selector: 'app-sponsorship',
  templateUrl: './sponsorship.component.html',
  styleUrls: ['./sponsorship.component.scss'],
})
export class SponsorshipComponent {
  referalURL!: string;
  isReferalCopied!: boolean;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private authService: AuthService,
    private clipboard: Clipboard
  ) {
    // Access the base URL
    const baseUrl = this.document.baseURI;
    this.referalURL = `${
      this.document.baseURI
    }auth/register/${this.authService.getUserId()}`;
  }

  async copyToClipboard(htmlText: string) {
    this.clipboard.copy(htmlText);
    this.isReferalCopied = await this.isReferalLinkCopied();
  }

  async isReferalLinkCopied(): Promise<boolean> {
    const copiedText = await navigator.clipboard.readText();
    return copiedText == this.referalURL;
  }
}
