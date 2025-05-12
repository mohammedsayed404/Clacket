import { Component } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  powerBiUrl: SafeUrl;

  constructor(private sanitizer: DomSanitizer) {
    // Sanitize the Power BI URL
    this.powerBiUrl = this.sanitizer.bypassSecurityTrustResourceUrl(
      'https://app.powerbi.com/view?r=eyJrIjoiZWI0ZjlmYmEtODczMi00OTA3LWFkNzItY2E3OWYzMTU0OTFlIiwidCI6ImRmODY3OWNkLWE4MGUtNDVkOC05OWFjLWM4M2VkN2ZmOTVhMCJ9'
      // 'https://app.powerbi.com/groups/me/reports/f6ab256d-d5f7-43a4-93b1-b2c4e7bbe27c/ReportSection8a855fad087a992d0073?experience=power-bi'
    );
  }

}
