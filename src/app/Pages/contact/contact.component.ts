import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SecurityCodeService } from '../../Services/security-code.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  generatedCode: string;

  constructor(
    private fb: FormBuilder,
    private securityCodeService: SecurityCodeService
  ) {
    this.generatedCode = this.securityCodeService.generateSecurityCode();
    this.contactForm = this.fb.group({
      firstName: ['', [Validators.required]], // Add name field
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      message: ['', [Validators.required]],
      securityCode: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.contactForm.valueChanges.subscribe(() => {
      this.updateButtonState();
    });
  }

  updateButtonState(): void {
    const securityCodeControl = this.contactForm.get('securityCode');
    const button = document.querySelector(
      '.contact-btn.custom-btn-gn'
    ) as HTMLButtonElement;
    if (
      this.contactForm.valid &&
      securityCodeControl?.value === this.generatedCode
    ) {
      button.classList.remove('dd-disable');
      button.disabled = false;
    } else {
      button.classList.add('dd-disable');
      button.disabled = true;
    }
  }

  refreshSecurityCode(): void {
    this.generatedCode = this.securityCodeService.generateSecurityCode();
    this.contactForm.get('securityCode')?.setValue('');
    this.updateButtonState();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.contactForm.valid) {
      console.log('Form Submitted!', this.contactForm.value);
    }
  }
}
