# HTTP 418: I'm a Teapot

HTTP status code 418 has the text "I'm a Teapot". You may see it in a library's status table and wonder whether it is real. It was defined in an April Fools' RFC, and RFC 9110 says it has been deployed as a joke.

**Where it came from.** RFC 2324, the Hyper Text Coffee Pot Control Protocol, is dated 1 April 1998. Its section 2.3.2 says that brewing coffee with a teapot "should result in the error code '418 I'm a teapot'." The RFC itself never calls this a joke. In its text, the only sign of that is the 1 April date in the header.

**Tea.** RFC 7168, also dated 1 April 2014, updates RFC 2324 to cover tea. Section 2.3.3 says teapots not provisioned to brew coffee may return 503 for temporary unavailability of coffee, or 418 "to denote a more permanent indication that the pot is a teapot." It does not define a new code.

**Is it still around?** Yes. Node.js still lists it in its status codes:

```js
require('http').STATUS_CODES[418]; // "I'm a Teapot"
```

I ran this on Node v22.23.1.

**Should you use it?** No. RFC 9110 (2022) calls RFC 2324 "an April 1 RFC" and says 418 has been "deployed as a joke often enough for the code to be unusable for any future use." It reserves the code in the IANA registry, but says it "can be re-assigned to another use" if future circumstances require it. For real errors, use a status code with a meaning your clients can rely on, such as a 4xx that matches the problem.
