from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode
from django.contrib.auth.tokens import default_token_generator

from django.core.mail import EmailMultiAlternatives
from django.template import loader
from django.contrib.sites.shortcuts import get_current_site


class SendEmail:
	def send_mail(self, request, user=None, from_email=None, domain_override=None, subject_template_name=None, email_template_name=None):
		if not user:
			user = request.user
		to_email = user.email
		use_https = request.is_secure()
		current_site = get_current_site(request)

		domain_override = None
		if not domain_override:
			current_site = get_current_site(request)
			site_name = current_site.name
			domain = current_site.domain
		else:
			site_name = domain = domain_override

		uid = urlsafe_base64_encode(force_bytes(user.id))
		token_generator = default_token_generator
		token = token_generator.make_token(user)
		context = {
		'domain': domain,
		'site_name': site_name,
		'uid': uid,
		'user': user,
		'token': token,
		'protocol': 'https' if use_https else 'http',
		}

		subject = loader.render_to_string(subject_template_name, context)
		subject = ''.join(subject.splitlines())
		body = loader.render_to_string(email_template_name, context)
		html_template = loader.get_template(email_template_name)
		email_context = html_template.render(context)

		email_message = EmailMultiAlternatives(subject, body, from_email, [to_email])
		email_message.attach_alternative(email_context, "text/html")
		email_message.send()