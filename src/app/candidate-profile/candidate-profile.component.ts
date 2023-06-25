import { Component } from '@angular/core';

@Component({
  selector: 'app-candidate-profile',
  templateUrl: './candidate-profile.component.html',
  styleUrls: ['./candidate-profile.component.css']
})
export class CandidateProfileComponent {

  selectedFile: File | null = null;

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileUpload() {
    // Envoyez la demande HTTP pour télécharger le fichier vers votre serveur ou API
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('file', this.selectedFile, this.selectedFile.name);

      // Ajoutez ici le code pour envoyer le fichier vers votre backend
      // Par exemple, vous pouvez utiliser HttpClient d'Angular pour envoyer la demande HTTP POST vers votre backend
      // this.httpClient.post('votre-url-de-telechargement', formData).subscribe(response => {
      //   Gérer la réponse du téléchargement ici
      // });
    }
  }

  getPdfUrl() {
    if (this.selectedFile) {
      return URL.createObjectURL(this.selectedFile);
    }
    return null;
  }

  openCV() {
    $('#cvModal').modal('show');
  }
}
