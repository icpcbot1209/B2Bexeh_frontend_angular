import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class SwalService {
  async confirm(text = null, yes = null) {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: text || "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: yes || 'Yes, delete it',
    });
    return result.isConfirmed;
  }
}
