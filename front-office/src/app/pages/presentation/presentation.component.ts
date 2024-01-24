import { Component, Input, OnInit } from '@angular/core';
import { CardBoxItem } from '../../components/card-box/card-box.component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { PostDTO } from 'src/app/store/post/post.interface';
import { PostService } from 'src/app/services/post/post.service';
import { CardBlogItem } from 'src/app/components/card-blog/card-blog.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewsLettersService } from 'src/app/services/newsLetters/news-letters.service';
import {
  FournisseurService,
  ProviderDTO1,
} from 'src/app/services/fournisseur/fournisseur.service';
import { ProviderDTO } from 'src/app/store/provider/provider.interface';
import { CardProviderItem } from 'src/app/components/card-provider/card-provider.component';
import { Observable } from 'rxjs';
import { BoxStatus, IBox } from 'src/app/store/box/box.interface';
import { Store, select } from '@ngrx/store';
import * as fromBox from '../../store/box/index';
import { CardGrosLotItem } from 'src/app/components/card-gros-lot/card-gros-lot.component';
import { BoxService } from 'src/app/services/box/box.service';
import { BannerService } from 'src/app/services/banner/banner.service';
import { BannerDTO } from 'src/app/store/banner/banner.interface';
import { SharedDataService } from 'src/app/config/shared-data-service';
import { AlertService } from 'src/app/services/alert/alert.service';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-presentation',
  templateUrl: './presentation.component.html',
  styleUrls: ['./presentation.component.scss'],
})
export class PresentationComponent implements OnInit {
  // eslint-disable-next-line no-unused-vars
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router,
    private readonly store: Store,
    private formBuilder: FormBuilder,
    private newsLettersService: NewsLettersService,
    private providerService: FournisseurService,
    private boxService: BoxService,
    private bannerService: BannerService,
    private sharedDataService: SharedDataService,
    private alertService: AlertService,
    private translate: TranslateService,
    private cookieService: CookieService
  ) {
    this.newsletterForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });

    this.checkCookies();
  }

  @Input()
  boxList: any[] = [];

  @Input()
  cardBoxItem!: CardBoxItem;

  allBox$!: Observable<IBox[]>;
  // allProvider$!: Observable<ProviderDTO[]>;
  isLoading$!: Observable<boolean>;
  listBestSelledBox: CardBoxItem[] = [];
  listBox: IBox[] = [];

  listGrosLotBox: CardGrosLotItem[] = [];
  cardGrosLotItem!: CardGrosLotItem;

  newsletterForm: FormGroup;

  cardBlogItem!: CardBlogItem;
  listPost: PostDTO[] = [];

  cardProviderItem!: CardProviderItem;
  listProvider: CardProviderItem[] = [];
  providerList: ProviderDTO[] = [];

  BannerList: BannerDTO[] = [];

  cookieValue: string | undefined;
  isCookiesModalShown: boolean = false;

  ngOnInit(): void {
    this.getAllPost();
    this.getAllFournisseur();
    this.getAllBanner();
    this.setUp();
    this.setUpGrosLot();
    this.getBannerImageTop();
    // this.getAllFournisseurBox();
    this.getBannerImageBottom();

    this.sharedDataService.getGlobalBLogList().subscribe(data => {
      // Refresh all Nouveuax Blog
      if (data !== null) {
        this.getAllPost();
      }
    });

    this.sharedDataService.getGlobalProviderList().subscribe(data => {
      if (data !== null) {
        // Refresh all Fournisseur
        this.getAllFournisseur();
      }
    });
    this.sharedDataService.getBanner().subscribe(data => {
      if (data !== null) {
        // Refresh all Fournisseur
        this.getBannerImageTop();
        this.getBannerImageBottom();
      }
    });
  }

  getBannerImageTop() {
    this.bannerService
      .getAllBanner({ include: { box: true } })
      .subscribe(data => {
        const bannerImageTop: BannerDTO[] = Object.values(data).filter(
          bannerTop =>
            bannerTop.type === 'WELCOME' ||
            bannerTop.type === 'SUBSCRIPTION' ||
            bannerTop.type === 'SPONSORSHIP'
        );
        const newImages = bannerImageTop.map((banner: BannerDTO) => ({
          imageSrc: banner.bannerImgUrl,
          imageAlt: 'image',
          bannerLink: banner.bannerLink,
        }));
        this.images = [];
        this.images.push(...newImages);
      });
  }

  getBannerImageBottom() {
    this.bannerService
      .getAllBanner({ include: { box: true } })
      .subscribe(data => {
        const bannerImageTop: BannerDTO[] = Object.values(data).filter(
          bannerTop => bannerTop.type === 'ADVERTISEMENT'
        );
        const newImages = bannerImageTop.map((banner: BannerDTO) => ({
          imageSrc: banner.bannerImgUrl,
          imageAlt: 'image',
          bannerLink: banner.bannerLink,
        }));
        this.imagesBottom = [];
        this.imagesBottom.push(...newImages);
      });
  }

  images: any[] = [];
  imagesBottom: any[] = [];

  goDetailBox() {
    this.router.navigateByUrl('detail-box');
  }

  getBoxList(): any[] {
    return Array.from({ length: 5 }, () => null);
  }

  // submit Mail

  onSubmit() {
    if (this.newsletterForm.valid) {
      const newEmail = this.newsletterForm.value.email;
      this.newsLettersService
        .createUserAddress({ email: newEmail })
        .subscribe(response => {
          this.alertService.showAlert('SUCCESS', {
            header: 'Info',
            body: this.translate.instant('newsLetter'),
            // footer: 'footer',
          });
          this.newsletterForm.reset();
        });
    }
  }

  // Ckeck llist box le plus vendu

  setUp() {
    this.allBox$ = this.store.pipe(select(fromBox.selectBoxList));
    this.isLoading$ = this.store.pipe(select(fromBox.selectBoxIsLoading));
    this.allBox$.subscribe(boxList => {
      this.listBestSelledBox = boxList
        .filter((box: IBox) => box.boxParams?.isBestSelling === true)
        .map((box: IBox) => {
          const closedImage = box.boxImage.find(
            image => image.status === BoxStatus.CLOSED
          );
          const openedImage = box.boxImage.find(
            image => image.status === BoxStatus.OPENED
          );
          const playingImage = box.boxImage.find(
            image => image.status === BoxStatus.PLAYING
          );
          const otherImage = box.boxImage.find(
            image => image.status === BoxStatus.OTHER
          );
          let imageUrlToShow = '';

          if (closedImage) {
            imageUrlToShow = closedImage.photoUrl;
          } else if (openedImage) {
            imageUrlToShow = openedImage.photoUrl;
          } else if (playingImage) {
            imageUrlToShow = playingImage.photoUrl;
          } else if (otherImage) {
            imageUrlToShow = otherImage.photoUrl;
          } else {
            imageUrlToShow = '';
          }

          return {
            id: box.id,
            titre: box.name,
            title: box.name.substring(0, 20),
            subTitle: box.boxType.name,
            textLeft: box.badge,
            textRight: String(box.price) + '€',
            imageUrl: imageUrlToShow,
          };
        })
        .slice(0, 5);
    });
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  // Box le plus grand Lot

  setUpGrosLot() {
    this.allBox$ = this.store.pipe(select(fromBox.selectBoxList));
    this.isLoading$ = this.store.pipe(select(fromBox.selectBoxIsLoading));
    this.allBox$.subscribe(boxList => {
      this.listGrosLotBox = boxList
        .filter((box: IBox) => box.boxParams?.isBigPrice === true)
        .map((box: IBox) => {
          const closedImage = box.boxImage.find(
            image => image.status === BoxStatus.CLOSED
          );
          const openedImage = box.boxImage.find(
            image => image.status === BoxStatus.OPENED
          );
          const playingImage = box.boxImage.find(
            image => image.status === BoxStatus.PLAYING
          );
          const otherImage = box.boxImage.find(
            image => image.status === BoxStatus.OTHER
          );
          let imageUrlToShow = '';

          if (closedImage) {
            imageUrlToShow = closedImage.photoUrl;
          } else if (openedImage) {
            imageUrlToShow = openedImage.photoUrl;
          } else if (playingImage) {
            imageUrlToShow = playingImage.photoUrl;
          } else if (otherImage) {
            imageUrlToShow = otherImage.photoUrl;
          } else {
            imageUrlToShow = '';
          }
          return {
            imageUrl: imageUrlToShow,
            prix: String(box.price) + ' €',
            id: box.id,
          };
        })
        .slice(0, 1);
    });
  }

  // format Nouveau Blog

  getCardItemFormatted(): CardBlogItem[] {
    const limitedBlog = this.listPost.slice(0, 3);
    return limitedBlog.map(post => ({
      title: post.title.substring(0, 16),
      description: post.content.substring(0, 100) + ' . . .',
      imageUrl: post.article.articlePhoto[0]?.photoUrl,
      lien: post.postUrl,
    }));
  }

  // format Fournisseur

  getCardProviderItemFormatted(): CardProviderItem[] {
    const pinnedProviders = this.providerList.filter(
      provider => provider.isPinned === true
    );
    const limitedPinnedProviders = pinnedProviders.slice(0, 8);

    return limitedPinnedProviders.map(provider => ({
      id: provider.id,
      imageUrl: provider.logo,
      onClick: () => this.filtrebox(provider),
    }));
  }

  filtrebox(provider: ProviderDTO) {
    // this.selectedProviderId = provider.id;
    const providerId = provider.id;
    console.log('test', providerId);
    this.providerService.setSelectedProviderId(providerId);
    this.router.navigate(['store']);
  }

  selectedProviderId: string | null = null;
  selectedBox: any = null;

  getAllBanner() {
    this.bannerService
      .getAllBanner({ include: { box: true } })
      .subscribe(data => {
        this.BannerList = data;
      });
  }
  getAllFournisseur() {
    this.providerService.getAll().subscribe(data => {
      this.providerList = data;
    });
  }

  fournisseurListe: ProviderDTO1[] = [];
  box: IBox | undefined;
  filteredBoxes: IBox[] = [];

  getAllPost() {
    this.postService
      .getAllPost({ include: { article: { include: { articlePhoto: true } } } })
      .subscribe(data => {
        this.listPost = data;
      });
  }

  openBox(boxId: string) {
    this.router.navigate(['detail-box', boxId]);
  }

  checkCookies() {
    this.cookieValue = this.cookieService.get('Test');
    console.log(this.cookieValue);
    if (!this.cookieValue) {
      this.showCookiesModal();
    }
  }

  showCookiesModal() {
    //alert('tonga');
    this.isCookiesModalShown = true;
  }

  setCookies() {
    this.cookieService.set('Test', 'Teste cookies');
  }
}
