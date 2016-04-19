<strong>Someone submitted the contact form!</strong>

<p>Name &mdash; {{ $name }}</p>

<p>Email &mdash; {{ $email }}</p>

@if ($website)
    <p>Website &mdash; <a href="{{ $website }}">{{ $website }}</a></p>
@endif

<p>Inquiry &mdash; {{ $select }}</p>

<p>Message &mdash; {{ $bodyMessage }}</p>