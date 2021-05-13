/* eslint-disable react/no-unescaped-entities */
import React from "react";

export const Content = ({ lang }) => {
  const contentLang = {
    en: ContentEN,
    pl: ContentPL,
  };

  return contentLang[lang] || contentLang.en;
};

export const ContentEN = (
  <>
    <p>
      We are very delighted that you have shown interest in our website. Data protection is of a
      particularly high priority for the management of the Octoboards. The use of the Internet pages
      of the Octoboards is possible without any indication of personal data; however, if a data
      subject wants to use special services via our website, processing of personal data could
      become necessary. If the processing of personal data is necessary and there is no statutory
      basis for such processing, we generally obtain consent from the data subject.
    </p>
    <p>
      The processing of personal data, such as the name, address, e-mail address, or telephone
      number of a data subject shall always be in line with the General Data Protection Regulation
      (GDPR), and in accordance with the country-specific data protection regulations applicable to
      the Octoboards. By means of this data protection declaration, our website would like to inform
      the general public of the nature, scope, and purpose of the personal data we collect, use and
      process. Furthermore, data subjects are informed, by means of this data protection
      declaration, of the rights to which they are entitled.
    </p>
    <p>
      As the controller, the Octoboards has implemented numerous technical and organizational
      measures to ensure the most complete protection of personal data processed through this
      website. However, Internet-based data transmissions may in principle have security gaps, so
      absolute protection may not be guaranteed. For this reason, every data subject is free to
      transfer personal data to us via alternative means, e.g. by telephone.
    </p>
    <h3 id="1-definitions">1. Definitions</h3>
    <p>
      The data protection declaration of the Octoboards is based on the terms used by the European
      legislator for the adoption of the General Data Protection Regulation (GDPR). Our data
      protection declaration should be legible and understandable for the general public, as well as
      our customers and business partners. To ensure this, we would like to first explain the
      terminology used.
    </p>
    <p>In this data protection declaration, we use, inter alia, the following terms:</p>
    <ul>
      <li>
        <h3 id="a-personal-data">a) Personal data</h3>
        <p>
          Personal data means any information relating to an identified or identifiable natural
          person (“data subject”). An identifiable natural person is one who can be identified,
          directly or indirectly, in particular by reference to an identifier such as a name, an
          identification number, location data, an online identifier or to one or more factors
          specific to the physical, physiological, genetic, mental, economic, cultural or social
          identity of that natural person.
        </p>
      </li>
      <li>
        <h3 id="b-data-subject">b) Data subject</h3>
        <p>
          Data subject is any identified or identifiable natural person, whose personal data is
          processed by the controller responsible for the processing.
        </p>
      </li>
      <li>
        <h3 id="c-processing">c) Processing</h3>
        <p>
          Processing is any operation or set of operations which is performed on personal data or on
          sets of personal data, whether or not by automated means, such as collection, recording,
          organisation, structuring, storage, adaptation or alteration, retrieval, consultation,
          use, disclosure by transmission, dissemination or otherwise making available, alignment or
          combination, restriction, erasure or destruction.
        </p>
      </li>
      <li>
        <h3 id="d-restriction-of-processing">d) Restriction of processing</h3>
        <p>
          Restriction of processing is the marking of stored personal data with the aim of limiting
          their processing in the future.
        </p>
      </li>
      <li>
        <h3 id="e-profiling">e) Profiling</h3>
        <p>
          Profiling means any form of automated processing of personal data consisting of the use of
          personal data to evaluate certain personal aspects relating to a natural person, in
          particular to analyse or predict aspects concerning that natural person&#39;s performance
          at work, economic situation, health, personal preferences, interests, reliability,
          behaviour, location or movements.
        </p>
      </li>
      <li>
        <h3 id="f-pseudonymisation">f) Pseudonymisation</h3>
        <p>
          Pseudonymisation is the processing of personal data in such a manner that the personal
          data can no longer be attributed to a specific data subject without the use of additional
          information, provided that such additional information is kept separately and is subject
          to technical and organisational measures to ensure that the personal data are not
          attributed to an identified or identifiable natural person.
        </p>
      </li>
      <li>
        <h3 id="g-controller-or-controller-responsible-for-the-processing">
          g) Controller or controller responsible for the processing
        </h3>
        <p>
          Controller or controller responsible for the processing is the natural or legal person,
          public authority, agency or other body which, alone or jointly with others, determines the
          purposes and means of the processing of personal data; where the purposes and means of
          such processing are determined by Union or Member State law, the controller or the
          specific criteria for its nomination may be provided for by Union or Member State law.
        </p>
      </li>
      <li>
        <h3 id="h-processor">h) Processor</h3>
        <p>
          Processor is a natural or legal person, public authority, agency or other body which
          processes personal data on behalf of the controller.
        </p>
      </li>
      <li>
        <h3 id="i-recipient">i) Recipient</h3>
        <p>
          Recipient is a natural or legal person, public authority, agency or another body, to which
          the personal data are disclosed, whether a third party or not. However, public authorities
          which may receive personal data in the framework of a particular inquiry in accordance
          with Union or Member State law shall not be regarded as recipients; the processing of
          those data by those public authorities shall be in compliance with the applicable data
          protection rules according to the purposes of the processing.
        </p>
      </li>
      <li>
        <h3 id="j-third-party">j) Third party</h3>
        <p>
          Third party is a natural or legal person, public authority, agency or body other than the
          data subject, controller, processor and persons who, under the direct authority of the
          controller or processor, are authorised to process personal data.
        </p>
      </li>
      <li>
        <h3 id="k-consent">k) Consent</h3>
        <p>
          Consent of the data subject is any freely given, specific, informed and unambiguous
          indication of the data subject&#39;s wishes by which he or she, by a statement or by a
          clear affirmative action, signifies agreement to the processing of personal data relating
          to him or her.
        </p>
      </li>
    </ul>
    <h3 id="2-name-and-address-of-the-controller">2. Name and Address of the controller</h3>
    <p>
      Controller for the purposes of the General Data Protection Regulation (GDPR), other data
      protection laws applicable in Member states of the European Union and other provisions related
      to data protection is:
    </p>
    <p>
      Octoboards
      <br />
      hello@octoboards.com
      <br />
      www.octoboards.com
    </p>
    <h3 id="3-cookies">3. Cookies</h3>
    <p>
      The Internet pages of the Octoboards use cookies. Cookies are text files that are stored in a
      computer system via an Internet browser.
    </p>
    <p>
      Many Internet sites and servers use cookies. Many cookies contain a so-called cookie ID. A
      cookie ID is a unique identifier of the cookie. It consists of a character string through
      which Internet pages and servers can be assigned to the specific Internet browser in which the
      cookie was stored. This allows visited Internet sites and servers to differentiate the
      individual browser of the dats subject from other Internet browsers that contain other
      cookies. A specific Internet browser can be recognized and identified using the unique cookie
      ID.
    </p>
    <p>
      Through the use of cookies, the Octoboards can provide the users of this website with more
      user-friendly services that would not be possible without the cookie setting.
    </p>
    <p>
      By means of a cookie, the information and offers on our website can be optimized with the user
      in mind. Cookies allow us, as previously mentioned, to recognize our website users. The
      purpose of this recognition is to make it easier for users to utilize our website. The website
      user that uses cookies, e.g. does not have to enter access data each time the website is
      accessed, because this is taken over by the website, and the cookie is thus stored on the
      user&#39;s computer system. Another example is the cookie of a shopping cart in an online
      shop. The online store remembers the articles that a customer has placed in the virtual
      shopping cart via a cookie.
    </p>
    <p>
      The data subject may, at any time, prevent the setting of cookies through our website by means
      of a corresponding setting of the Internet browser used, and may thus permanently deny the
      setting of cookies. Furthermore, already set cookies may be deleted at any time via an
      Internet browser or other software programs. This is possible in all popular Internet
      browsers. If the data subject deactivates the setting of cookies in the Internet browser used,
      not all functions of our website may be entirely usable.
    </p>
    <h3 id="4-collection-of-general-data-and-information">
      4. Collection of general data and information
    </h3>
    <p>
      The website of the Octoboards collects a series of general data and information when a data
      subject or automated system calls up the website. This general data and information are stored
      in the server log files. Collected may be (1) the browser types and versions used, (2) the
      operating system used by the accessing system, (3) the website from which an accessing system
      reaches our website (so-called referrers), (4) the sub-websites, (5) the date and time of
      access to the Internet site, (6) an Internet protocol address (IP address), (7) the Internet
      service provider of the accessing system, and (8) any other similar data and information that
      may be used in the event of attacks on our information technology systems.
    </p>
    <p>
      When using these general data and information, the Octoboards does not draw any conclusions
      about the data subject. Rather, this information is needed to (1) deliver the content of our
      website correctly, (2) optimize the content of our website as well as its advertisement, (3)
      ensure the long-term viability of our information technology systems and website technology,
      and (4) provide law enforcement authorities with the information necessary for criminal
      prosecution in case of a cyber-attack. Therefore, the Octoboards analyzes anonymously
      collected data and information statistically, with the aim of increasing the data protection
      and data security of our website, and to ensure an optimal level of protection for the
      personal data we process. The anonymous data of the server log files are stored separately
      from all personal data provided by a data subject.
    </p>
    <h3 id="5-registration-on-our-website">5. Registration on our website</h3>
    <p>
      The data subject has the possibility to register on the website of the controller with the
      indication of personal data. Which personal data are transmitted to the controller is
      determined by the respective input mask used for the registration. The personal data entered
      by the data subject are collected and stored exclusively for internal use by the controller,
      and for his own purposes. The controller may request transfer to one or more processors (e.g.
      a parcel service) that also uses personal data for an internal purpose which is attributable
      to the controller.
    </p>
    <p>
      By registering on the website of the controller, the IP address—assigned by the Internet
      service provider (ISP) and used by the data subject—date, and time of the registration are
      also stored. The storage of this data takes place against the background that this is the only
      way to prevent the misuse of our services, and, if necessary, to make it possible to
      investigate committed offenses. Insofar, the storage of this data is necessary to secure the
      controller. This data is not passed on to third parties unless there is a statutory obligation
      to pass on the data, or if the transfer serves the aim of criminal prosecution.
    </p>
    <p>
      The registration of the data subject, with the voluntary indication of personal data, is
      intended to enable the controller to offer the data subject contents or services that may only
      be offered to registered users due to the nature of the matter in question. Registered persons
      are free to change the personal data specified during the registration at any time, or to have
      them completely deleted from the data stock of the controller.
    </p>
    <p>
      The data controller shall, at any time, provide information upon request to each data subject
      as to what personal data are stored about the data subject. In addition, the data controller
      shall correct or erase personal data at the request or indication of the data subject, insofar
      as there are no statutory storage obligations. The entirety of the controller’s employees are
      available to the data subject in this respect as contact persons.
    </p>
    <h3 id="6-contact-possibility-via-the-website">6. Contact possibility via the website</h3>
    <p>
      The website of the Octoboards contains information that enables a quick electronic contact to
      our website, as well as direct communication with us, which also includes a general address of
      the so-called electronic mail (e-mail address). If a data subject contacts the controller by
      e-mail or via a contact form, the personal data transmitted by the data subject are
      automatically stored. Such personal data transmitted on a voluntary basis by a data subject to
      the data controller are stored for the purpose of processing or contacting the data subject.
      There is no transfer of this personal data to third parties.
    </p>
    <h3 id="7-routine-erasure-and-blocking-of-personal-data">
      7. Routine erasure and blocking of personal data
    </h3>
    <p>
      The data controller shall process and store the personal data of the data subject only for the
      period necessary to achieve the purpose of storage, or as far as this is granted by the
      European legislator or other legislators in laws or regulations to which the controller is
      subject to.
    </p>
    <p>
      If the storage purpose is not applicable, or if a storage period prescribed by the European
      legislator or another competent legislator expires, the personal data are routinely blocked or
      erased in accordance with legal requirements.
    </p>
    <h3 id="8-rights-of-the-data-subject">8. Rights of the data subject</h3>
    <ul>
      <li>
        <h3 id="a-right-of-confirmation">a) Right of confirmation</h3>
        <p>
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller the confirmation as to whether or not personal data concerning him or her
          are being processed. If a data subject wishes to avail himself of this right of
          confirmation, he or she may, at any time, contact any employee of the controller.
        </p>
      </li>
      <li>
        <h3 id="b-right-of-access">b) Right of access</h3>
        <p>
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller free information about his or her personal data stored at any time and a
          copy of this information. Furthermore, the European directives and regulations grant the
          data subject access to the following information:
        </p>
        <ul>
          <li>the purposes of the processing;</li>
          <li>the categories of personal data concerned;</li>
          <li>
            the recipients or categories of recipients to whom the personal data have been or will
            be disclosed, in particular recipients in third countries or international
            organisations;
          </li>
          <li>
            where possible, the envisaged period for which the personal data will be stored, or, if
            not possible, the criteria used to determine that period;
          </li>
          <li>
            the existence of the right to request from the controller rectification or erasure of
            personal data, or restriction of processing of personal data concerning the data
            subject, or to object to such processing;
          </li>
          <li>the existence of the right to lodge a complaint with a supervisory authority;</li>
          <li>
            where the personal data are not collected from the data subject, any available
            information as to their source;
          </li>
          <li>
            the existence of automated decision-making, including profiling, referred to in Article
            22(1) and (4) of the GDPR and, at least in those cases, meaningful information about the
            logic involved, as well as the significance and envisaged consequences of such
            processing for the data subject.
          </li>
        </ul>
        <p>
          Furthermore, the data subject shall have a right to obtain information as to whether
          personal data are transferred to a third country or to an international organisation.
          Where this is the case, the data subject shall have the right to be informed of the
          appropriate safeguards relating to the transfer.
        </p>
        <p>
          If a data subject wishes to avail himself of this right of access, he or she may, at any
          time, contact any employee of the controller.
        </p>
      </li>
      <li>
        <h3 id="c-right-to-rectification">c) Right to rectification</h3>
        <p>
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller without undue delay the rectification of inaccurate personal data
          concerning him or her. Taking into account the purposes of the processing, the data
          subject shall have the right to have incomplete personal data completed, including by
          means of providing a supplementary statement.
        </p>
        <p>
          If a data subject wishes to exercise this right to rectification, he or she may, at any
          time, contact any employee of the controller.
        </p>
      </li>
      <li>
        <h3 id="d-right-to-erasure-right-to-be-forgotten-">
          d) Right to erasure (Right to be forgotten)
        </h3>
        <p>
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller the erasure of personal data concerning him or her without undue delay, and
          the controller shall have the obligation to erase personal data without undue delay where
          one of the following grounds applies, as long as the processing is not necessary:
        </p>
        <ul>
          <li>
            The personal data are no longer necessary in relation to the purposes for which they
            were collected or otherwise processed.
          </li>
          <li>
            The data subject withdraws consent to which the processing is based according to point
            (a) of Article 6(1) of the GDPR, or point (a) of Article 9(2) of the GDPR, and where
            there is no other legal ground for the processing.
          </li>
          <li>
            The data subject objects to the processing pursuant to Article 21(1) of the GDPR and
            there are no overriding legitimate grounds for the processing, or the data subject
            objects to the processing pursuant to Article 21(2) of the GDPR.
          </li>
          <li>The personal data have been unlawfully processed.</li>
          <li>
            The personal data must be erased for compliance with a legal obligation in Union or
            Member State law to which the controller is subject.
          </li>
          <li>
            The personal data have been collected in relation to the offer of information society
            services referred to in Article 8(1) of the GDPR.
          </li>
        </ul>
        <p>
          If one of the aforementioned reasons applies, and a data subject wishes to request the
          erasure of personal data stored by the Octoboards, he or she may, at any time, contact any
          employee of the controller. An employee of Octoboards shall promptly ensure that the
          erasure request is complied with immediately.
        </p>
        <p>
          Where the controller has made personal data public and is obliged pursuant to Article
          17(1) to erase the personal data, the controller, taking account of available technology
          and the cost of implementation, shall take reasonable steps, including technical measures,
          to inform other controllers processing the personal data that the data subject has
          requested erasure by such controllers of any links to, or copy or replication of, those
          personal data, as far as processing is not required. An employees of the Octoboards will
          arrange the necessary measures in individual cases.
        </p>
      </li>
      <li>
        <h3 id="e-right-of-restriction-of-processing">e) Right of restriction of processing</h3>
        <p>
          Each data subject shall have the right granted by the European legislator to obtain from
          the controller restriction of processing where one of the following applies:
        </p>
        <ul>
          <li>
            The accuracy of the personal data is contested by the data subject, for a period
            enabling the controller to verify the accuracy of the personal data.
          </li>
          <li>
            The processing is unlawful and the data subject opposes the erasure of the personal data
            and requests instead the restriction of their use instead.
          </li>
          <li>
            The controller no longer needs the personal data for the purposes of the processing, but
            they are required by the data subject for the establishment, exercise or defence of
            legal claims.
          </li>
          <li>
            The data subject has objected to processing pursuant to Article 21(1) of the GDPR
            pending the verification whether the legitimate grounds of the controller override those
            of the data subject.
          </li>
        </ul>
        <p>
          If one of the aforementioned conditions is met, and a data subject wishes to request the
          restriction of the processing of personal data stored by the Octoboards, he or she may at
          any time contact any employee of the controller. The employee of the Octoboards will
          arrange the restriction of the processing.
        </p>
      </li>
      <li>
        <h3 id="f-right-to-data-portability">f) Right to data portability</h3>
        <p>
          Each data subject shall have the right granted by the European legislator, to receive the
          personal data concerning him or her, which was provided to a controller, in a structured,
          commonly used and machine-readable format. He or she shall have the right to transmit
          those data to another controller without hindrance from the controller to which the
          personal data have been provided, as long as the processing is based on consent pursuant
          to point (a) of Article 6(1) of the GDPR or point (a) of Article 9(2) of the GDPR, or on a
          contract pursuant to point (b) of Article 6(1) of the GDPR, and the processing is carried
          out by automated means, as long as the processing is not necessary for the performance of
          a task carried out in the public interest or in the exercise of official authority vested
          in the controller.
        </p>
        <p>
          Furthermore, in exercising his or her right to data portability pursuant to Article 20(1)
          of the GDPR, the data subject shall have the right to have personal data transmitted
          directly from one controller to another, where technically feasible and when doing so does
          not adversely affect the rights and freedoms of others.
        </p>
        <p>
          In order to assert the right to data portability, the data subject may at any time contact
          any employee of the Octoboards.
        </p>
      </li>
      <li>
        <h3 id="g-right-to-object">g) Right to object</h3>
        <p>
          Each data subject shall have the right granted by the European legislator to object, on
          grounds relating to his or her particular situation, at any time, to processing of
          personal data concerning him or her, which is based on point (e) or (f) of Article 6(1) of
          the GDPR. This also applies to profiling based on these provisions.
        </p>
        <p>
          The Octoboards shall no longer process the personal data in the event of the objection,
          unless we can demonstrate compelling legitimate grounds for the processing which override
          the interests, rights and freedoms of the data subject, or for the establishment, exercise
          or defence of legal claims.
        </p>
        <p>
          If the Octoboards processes personal data for direct marketing purposes, the data subject
          shall have the right to object at any time to processing of personal data concerning him
          or her for such marketing. This applies to profiling to the extent that it is related to
          such direct marketing. If the data subject objects to the Octoboards to the processing for
          direct marketing purposes, the Octoboards will no longer process the personal data for
          these purposes.
        </p>
        <p>
          In addition, the data subject has the right, on grounds relating to his or her particular
          situation, to object to processing of personal data concerning him or her by the
          Octoboards for scientific or historical research purposes, or for statistical purposes
          pursuant to Article 89(1) of the GDPR, unless the processing is necessary for the
          performance of a task carried out for reasons of public interest.
        </p>
        <p>
          In order to exercise the right to object, the data subject may contact any employee of the
          Octoboards. In addition, the data subject is free in the context of the use of information
          society services, and notwithstanding Directive 2002/58/EC, to use his or her right to
          object by automated means using technical specifications.
        </p>
      </li>
      <li>
        <h3 id="h-automated-individual-decision-making-including-profiling">
          h) Automated individual decision-making, including profiling
        </h3>
        <p>
          Each data subject shall have the right granted by the European legislator not to be
          subject to a decision based solely on automated processing, including profiling, which
          produces legal effects concerning him or her, or similarly significantly affects him or
          her, as long as the decision (1) is not is necessary for entering into, or the performance
          of, a contract between the data subject and a data controller, or (2) is not authorised by
          Union or Member State law to which the controller is subject and which also lays down
          suitable measures to safeguard the data subject&#39;s rights and freedoms and legitimate
          interests, or (3) is not based on the data subject&#39;s explicit consent.
        </p>
        <p>
          If the decision (1) is necessary for entering into, or the performance of, a contract
          between the data subject and a data controller, or (2) it is based on the data
          subject&#39;s explicit consent, the Octoboards shall implement suitable measures to
          safeguard the data subject&#39;s rights and freedoms and legitimate interests, at least
          the right to obtain human intervention on the part of the controller, to express his or
          her point of view and contest the decision.
        </p>
        <p>
          If the data subject wishes to exercise the rights concerning automated individual
          decision-making, he or she may, at any time, contact any employee of the Octoboards.
        </p>
      </li>
      <li>
        <h3 id="i-right-to-withdraw-data-protection-consent">
          i) Right to withdraw data protection consent
        </h3>
        <p>
          Each data subject shall have the right granted by the European legislator to withdraw his
          or her consent to processing of his or her personal data at any time.
        </p>
        <p>
          If the data subject wishes to exercise the right to withdraw the consent, he or she may,
          at any time, contact any employee of the Octoboards.
        </p>
      </li>
    </ul>
    <h3 id="9-data-protection-provisions-about-the-application-and-use-of-google-analytics-with-anonymization-function-">
      9. Data protection provisions about the application and use of Google Analytics (with
      anonymization function)
    </h3>
    <p>
      On this website, the controller has integrated the component of Google Analytics (with the
      anonymizer function). Google Analytics is a web analytics service. Web analytics is the
      collection, gathering, and analysis of data about the behavior of visitors to websites. A web
      analysis service collects, inter alia, data about the website from which a person has come
      (the so-called referrer), which sub-pages were visited, or how often and for what duration a
      sub-page was viewed. Web analytics are mainly used for the optimization of a website and in
      order to carry out a cost-benefit analysis of Internet advertising.
    </p>
    <p>
      The operator of the Google Analytics component is Google Ireland Limited, Gordon House, Barrow
      Street, Dublin, D04 E5W5, Ireland.
    </p>
    <p>
      For the web analytics through Google Analytics the controller uses the application &quot;_gat.
      _anonymizeIp&quot;. By means of this application the IP address of the Internet connection of
      the data subject is abridged by Google and anonymised when accessing our websites from a
      Member State of the European Union or another Contracting State to the Agreement on the
      European Economic Area.
    </p>
    <p>
      The purpose of the Google Analytics component is to analyze the traffic on our website. Google
      uses the collected data and information, inter alia, to evaluate the use of our website and to
      provide online reports, which show the activities on our websites, and to provide other
      services concerning the use of our Internet site for us.
    </p>
    <p>
      Google Analytics places a cookie on the information technology system of the data subject. The
      definition of cookies is explained above. With the setting of the cookie, Google is enabled to
      analyze the use of our website. With each call-up to one of the individual pages of this
      Internet site, which is operated by the controller and into which a Google Analytics component
      was integrated, the Internet browser on the information technology system of the data subject
      will automatically submit data through the Google Analytics component for the purpose of
      online advertising and the settlement of commissions to Google. During the course of this
      technical procedure, the enterprise Google gains knowledge of personal information, such as
      the IP address of the data subject, which serves Google, inter alia, to understand the origin
      of visitors and clicks, and subsequently create commission settlements.
    </p>
    <p>
      The cookie is used to store personal information, such as the access time, the location from
      which the access was made, and the frequency of visits of our website by the data subject.
      With each visit to our Internet site, such personal data, including the IP address of the
      Internet access used by the data subject, will be transmitted to Google in the United States
      of America. These personal data are stored by Google in the United States of America. Google
      may pass these personal data collected through the technical procedure to third parties.
    </p>
    <p>
      The data subject may, as stated above, prevent the setting of cookies through our website at
      any time by means of a corresponding adjustment of the web browser used and thus permanently
      deny the setting of cookies. Such an adjustment to the Internet browser used would also
      prevent Google Analytics from setting a cookie on the information technology system of the
      data subject. In addition, cookies already in use by Google Analytics may be deleted at any
      time via a web browser or other software programs.
    </p>
    <p>
      In addition, the data subject has the possibility of objecting to a collection of data that
      are generated by Google Analytics, which is related to the use of this website, as well as the
      processing of this data by Google and the chance to preclude any such. For this purpose, the
      data subject must download a browser add-on under the link
      <a href="https://tools.google.com/dlpage/gaoptout">
        https://tools.google.com/dlpage/gaoptout
      </a>
      and install it. This browser add-on tells Google Analytics through a JavaScript, that any data
      and information about the visits of Internet pages may not be transmitted to Google Analytics.
      The installation of the browser add-ons is considered an objection by Google. If the
      information technology system of the data subject is later deleted, formatted, or newly
      installed, then the data subject must reinstall the browser add-ons to disable Google
      Analytics. If the browser add-on was uninstalled by the data subject or any other person who
      is attributable to their sphere of competence, or is disabled, it is possible to execute the
      reinstallation or reactivation of the browser add-ons.
    </p>
    <p>
      Further information and the applicable data protection provisions of Google may be retrieved
      under
      <a href="https://www.google.com/intl/en/policies/privacy/">
        https://www.google.com/intl/en/policies/privacy/
      </a>
      and under
      <a href="http://www.google.com/analytics/terms/us.html">
        http://www.google.com/analytics/terms/us.html
      </a>
      . Google Analytics is further explained under the following Link
      <a href="https://www.google.com/analytics/">https://www.google.com/analytics/</a>.
    </p>
    <h3 id="10-legal-basis-for-the-processing">10. Legal basis for the processing</h3>
    <p>
      Art. 6(1) lit. a GDPR serves as the legal basis for processing operations for which we obtain
      consent for a specific processing purpose. If the processing of personal data is necessary for
      the performance of a contract to which the data subject is party, as is the case, for example,
      when processing operations are necessary for the supply of goods or to provide any other
      service, the processing is based on Article 6(1) lit. b GDPR. The same applies to such
      processing operations which are necessary for carrying out pre-contractual measures, for
      example in the case of inquiries concerning our products or services. Is our company subject
      to a legal obligation by which processing of personal data is required, such as for the
      fulfillment of tax obligations, the processing is based on Art. 6(1) lit. c GDPR. In rare
      cases, the processing of personal data may be necessary to protect the vital interests of the
      data subject or of another natural person. This would be the case, for example, if a visitor
      were injured in our company and his name, age, health insurance data or other vital
      information would have to be passed on to a doctor, hospital or other third party. Then the
      processing would be based on Art. 6(1) lit. d GDPR. Finally, processing operations could be
      based on Article 6(1) lit. f GDPR. This legal basis is used for processing operations which
      are not covered by any of the abovementioned legal grounds, if processing is necessary for the
      purposes of the legitimate interests pursued by our company or by a third party, except where
      such interests are overridden by the interests or fundamental rights and freedoms of the data
      subject which require protection of personal data. Such processing operations are particularly
      permissible because they have been specifically mentioned by the European legislator. He
      considered that a legitimate interest could be assumed if the data subject is a client of the
      controller (Recital 47 Sentence 2 GDPR).
    </p>
    <h3 id="11-the-legitimate-interests-pursued-by-the-controller-or-by-a-third-party">
      11. The legitimate interests pursued by the controller or by a third party
    </h3>
    <p>
      Where the processing of personal data is based on Article 6(1) lit. f GDPR our legitimate
      interest is to carry out our business in favor of the well-being of all our employees and the
      shareholders.
    </p>
    <h3 id="12-period-for-which-the-personal-data-will-be-stored">
      12. Period for which the personal data will be stored
    </h3>
    <p>
      The criteria used to determine the period of storage of personal data is the respective
      statutory retention period. After expiration of that period, the corresponding data is
      routinely deleted, as long as it is no longer necessary for the fulfillment of the contract or
      the initiation of a contract.
    </p>
    <h3 id="13-provision-of-personal-data-as-statutory-or-contractual-requirement-requirement-necessary-to-enter-into-a-contract-obligation-of-the-data-subject-to-provide-the-personal-data-possible-consequences-of-failure-to-provide-such-data">
      13. Provision of personal data as statutory or contractual requirement; Requirement necessary
      to enter into a contract; Obligation of the data subject to provide the personal data;
      possible consequences of failure to provide such data
    </h3>
    <p>
      We clarify that the provision of personal data is partly required by law (e.g. tax
      regulations) or can also result from contractual provisions (e.g. information on the
      contractual partner). Sometimes it may be necessary to conclude a contract that the data
      subject provides us with personal data, which must subsequently be processed by us. The data
      subject is, for example, obliged to provide us with personal data when our company signs a
      contract with him or her. The non-provision of the personal data would have the consequence
      that the contract with the data subject could not be concluded. Before personal data is
      provided by the data subject, the data subject must contact any employee. The employee
      clarifies to the data subject whether the provision of the personal data is required by law or
      contract or is necessary for the conclusion of the contract, whether there is an obligation to
      provide the personal data and the consequences of non-provision of the personal data.
    </p>
    <h3 id="14-existence-of-automated-decision-making">
      14. Existence of automated decision-making
    </h3>
    <p>As a responsible company, we do not use automatic decision-making or profiling.</p>
    <p>
      Developed by the specialists for <a href="https://willing-able.com/">LegalTech</a> at Willing
      &amp; Able that also developed the system for
      <a href="https://abletorecords.com/">pia dpia</a>. The legal texts contained in our privacy
      policy generator have been provided and published by
      <a href="https://dg-datenschutz.de/">Prof. Dr. h.c. Heiko Jonny Maniero</a> from the German
      Association for Data Protection and <a href="https://www.wbs-law.de/">Christian Solmecke</a>
      from WBS law.
    </p>
  </>
);

export const ContentPL = (
  <>
    <p>
      Cieszymy się bardzo z zainteresowania naszą stroną internetową. Ochrona danych osobowych ma
      istotne znaczenie przy prowadzeniu spraw od Octoboards. W zasadzie korzystanie ze stron
      internetowych Octoboards jest możliwe bez konieczności podawania jakichkolwiek danych
      osobowych. Jeśli jednak osoba, której dane dotyczą, chciałaby korzystać ze specjalnych usług
      poprzez naszą stronę internetową, wtedy przetwarzanie danych osobowych może okazać się
      konieczne. Jeżeli zachodzi konieczność przetwarzania danych, a nie ma podstawy prawnej dla
      tego rodzaju działania, uzyskujemy generalnie zgodę osoby, której dane dotyczą.
    </p>

    <p>
      Przetwarzanie danych osobowych takich jak nazwisko, adres, adres e-mail lub numer telefonu
      osoby, której dane dotyczą, odbywa się zawsze zgodnie z ogólnym rozporządzeniem o ochronie
      danych oraz w zgodzie z obowiązującymi dla Octoboards w danym kraju specyficznymi przepisami o
      ochronie danych. Poprzez niniejsze oświadczenie o ochronie danych nasze przedsiębiorstwo
      pragnie przekazać do wiadomości publicznej informacje, jaki jest charakter, zakres oraz cel
      zbieranych, używanych i przetwarzanych przez nas danych osobowych. Niniejsze oświadczenie ma
      również na celu poinformować osoby, których dane dotyczą, o przysługujących im prawach.
    </p>

    <p>
      Octoboards jako odpowiedzialny za przetwarzanie administrator wdrożył liczne środki techniczne
      oraz organizacyjne w celu zapewnienia najskuteczniej ochrony danych osobowych, które są
      przetwarzane za pośrednictwem niniejszej strony internetowej. Internetowe przesyły danych mogą
      jednak wykazywać luki w środkach bezpieczeństwa, więc absolutna ochrona nie może być
      zagwarantowana. Z tego względu każda osoba, której dane dotyczą, może nam przesłać dane
      osobowe w inny sposób, na przykład telefonicznie.
    </p>

    <h4>1. Definicje.</h4>
    <p>
      Oświadczenie o ochronie danych od Octoboards opiera się na terminologii stosowanej przez
      ustawodawcę Unii Europejskiej przy wydawaniu ogólnego rozporządzenia o ochronie danych (w
      skrócie "RODO"). Nasze oświadczenie o ochronie danych powinno być łatwe do przeczytania i
      zrozumiałe zarówno dla wszystkich, jak i dla naszych klientów i partnerów biznesowych. W tym
      celu chcielibyśmy z wyprzedzeniem wyjaśnić stosowaną przez nas terminologię.
    </p>

    <p>W niniejszym oświadczeniu o ochronie danych stosujemy między innymi następujące pojęcia:</p>

    <ul>
      <li>
        <h4>a) Dane osobowe.</h4>
        <p>
          Dane osobowe to wszelkie informacje dotyczące zidentyfikowanej lub możliwej do
          zidentyfikowania osoby fizycznej (zwane dalej "osobą, której dane dotyczą"). Możliwa do
          zidentyfikowania osoba fizyczna to osoba, którą można bezpośrednio lub pośrednio
          zidentyfikować, w szczególności na podstawie identyfikatora takiego jak nazwisko, numer
          identyfikacyjny, dane o lokalizacji, identyfikator internetowy lub jeden bądź kilka
          szczególnych czynników określających fizyczną, fizjologiczną, genetyczną, psychiczną,
          ekonomiczną, kulturową lub społeczną tożsamość osoby fizycznej.
        </p>
      </li>
      <li>
        <h4>b) Osoba, której dane dotyczą.</h4>
        <p>
          Osoba, której dane dotyczą, to każda zidentyfikowana lub możliwa do zidentyfikowania osoba
          fizyczna, której dane osobowe są przetwarzane przez administratora.
        </p>
      </li>
      <li>
        <h4>c) Przetwarzanie.</h4>
        <p>
          Przetwarzanie oznacza operację lub zestaw operacji wykonywanych na danych osobowych lub
          zestawach danych osobowych w sposób zautomatyzowany lub niezautomatyzowany, taką jak
          zbieranie, utrwalanie, organizowanie, porządkowanie, przechowywanie, adaptowanie lub
          modyfikowanie, pobieranie, przeglądanie, wykorzystywanie, ujawnianie poprzez przesłanie,
          rozpowszechnianie lub innego rodzaju udostępnianie, dopasowywanie lub łączenie,
          ograniczanie, usuwanie lub niszczenie.
        </p>
      </li>
      <li>
        <h4>d) Ograniczenie przetwarzania.</h4>
        <p>
          Ograniczenie przetwarzania jest to oznaczenie przechowywanych danych osobowych w celu
          ograniczenia ich przyszłego przetwarzania.
        </p>
      </li>
      <li>
        <h4>e) Profilowanie.</h4>
        <p>
          Profilowanie oznacza dowolną formę zautomatyzowanego przetwarzania danych osobowych, które
          polega na wykorzystaniu danych osobowych do oceny niektórych czynników osobowych osoby
          fizycznej, w szczególności do analizy lub prognozy aspektów dotyczących efektów pracy tej
          osoby fizycznej, jej sytuacji ekonomicznej, zdrowia, osobistych preferencji,
          zainteresowań, wiarygodności, zachowania, lokalizacji lub przemieszczania się.
        </p>
      </li>
      <li>
        <h4>f) Pseudonimizacja.</h4>
        <p>
          Pseudonimizacja oznacza przetworzenie danych osobowych w taki sposób, by nie można ich
          było już przypisać konkretnej osobie, której dane dotyczą, bez użycia dodatkowych
          informacji, pod warunkiem że takie dodatkowe informacje są przechowywane osobno i są
          objęte środkami technicznymi i organizacyjnymi uniemożliwiającymi ich przypisanie
          zidentyfikowanej lub możliwej do zidentyfikowania osobie fizycznej.
        </p>
      </li>
      <li>
        <h4>g) Administrator.</h4>
        <p>
          Administrator oznacza osobę fizyczną lub prawną, organ publiczny, jednostkę lub inny
          podmiot, który samodzielnie lub wspólnie z innymi ustala cele i sposoby przetwarzania
          danych osobowych. Jeżeli cele i sposoby takiego przetwarzania są określone w prawie Unii
          lub w prawie państwa członkowskiego, to również w prawie Unii lub w prawie państwa
          członkowskiego może zostać wyznaczony administrator lub mogą zostać określone konkretne
          kryteria jego wyznaczania.
        </p>
      </li>
      <li>
        <h4>h) Podmiot przetwarzający.</h4>
        <p>
          Podmiot przetwarzający oznacza osobę fizyczną lub prawną, organ publiczny, jednostkę lub
          inny podmiot, który przetwarza dane osobowe w imieniu administratora.
        </p>
      </li>
      <li>
        <h4>i) Odbiorca.</h4>
        <p>
          Odbiorca oznacza osobę fizyczną lub prawną, organ publiczny, jednostkę lub inny podmiot,
          któremu ujawnia się dane osobowe, niezależnie od tego, czy jest stroną trzecią. Organy
          publiczne, które mogą otrzymywać dane osobowe w ramach konkretnego postępowania zgodnie z
          prawem Unii lub prawem państwa członkowskiego, nie są jednak uznawane za odbiorców.
        </p>
      </li>
      <li>
        <h4>j) Strona trzecia.</h4>
        <p>
          Strona trzecia oznacza osobę fizyczną lub prawną, organ publiczny, jednostkę lub podmiot
          inny niż osoba, której dane dotyczą, administrator, podmiot przetwarzający czy osoby,
          które - z upoważnienia administratora lub podmiotu przetwarzającego – mogą przetwarzać
          dane osobowe.
        </p>
      </li>
      <li>
        <h4>k) Zgoda.</h4>
        <p>
          Zgoda osoby, której dane dotyczą oznacza każde dobrowolne, konkretne, świadome i
          jednoznaczne okazanie woli, którym osoba, której dane dotyczą, w formie oświadczenia lub
          wyraźnego działania potwierdzającego, przyzwala na przetwarzanie dotyczących jej danych
          osobowych.
        </p>
      </li>
    </ul>

    <h4>2. Nazwa i adres administratora.</h4>
    <p>
      Administratorem w rozumieniu ogólnego rozporządzenia o ochronie danych, pozostałych przepisów
      ustaw o ochronie danych obowiązujących w państwach członkowskich Unii Europejskiej oraz innych
      przepisów odnoszących się do ochrony danych jest:
    </p>

    <p>
      Octoboards
      <br />
      hello@octoboards.com
      <br />
      www.octoboards.com
    </p>

    <h4>3. Pliki cookies.</h4>
    <p>
      Strony internetowe Octoboards używają plików cookies. Pliki cookies to pliki tekstowe, które
      są zapisywane oraz przechowywane przez przeglądarkę internetową w systemie komputerowym.
    </p>

    <p>
      Liczne strony internetowe oraz serwery używają plików cookies. Wiele plików cookies zawiera
      tak zwany cookie-ID. Cookie-ID stanowi jednoznaczny identyfikator plików cookies. Składa się
      on z ciągu znaków, za pomocą których strony internetowe oraz serwery mogą być przyporządkowane
      do określonej przeglądarki internetowej, w której został przechowany plik cookie. Pozwala to
      odwiedzanym stronom internetowym i serwerom na odróżnianie indywidualnej przeglądarki osoby,
      której dane dotyczą, od innych przeglądarek internetowych, zawierających inne pliki cookies.
      Jednoznaczny plik cookie-ID pozwala na rozpoznanie i identyfikację określonej przeglądarki
      internetowej.
    </p>

    <p>
      Używając plików cookies Octoboards może udostępniać użytkownikom tej strony internetowej
      bardziej przyjazne dla użytkownika usługi, co nie byłoby możliwe bez umieszczania pliku
      cookie.
    </p>

    <p>
      Przy pomocy pliku cookie Informacje oraz usługi na naszej stronie internetowej mogą zostać
      zoptymalizowane pod kątem użytkownika. Jak wspomniano wyżej, pliki cookies umożliwiają nam
      rozpoznawanie użytkowników naszej strony internetowej. Rozpoznanie to ma na celu ułatwić
      użytkownikom korzystanie z naszej strony internetowej. Przykładowo użytkownik strony
      internetowej, stosującej pliki cookies nie musi przy każdej wizycie na stronie internetowej
      podawać ponownie swoich danych dostępu, ponieważ robi to za niego strona internetowa i plik
      cookie, zapisany w systemie komputerowym użytkownika. Innym przykładem jest plik cookie
      koszyka towarów w sklepie internetowym. Sklep internetowy zapamiętuje artykuły klienta włożone
      do wirtualnego koszyka towarów przy użyciu pliku cookie.
    </p>

    <p>
      Osoba, której dane dotyczą, może w każdej chwili zapobiec umieszczaniu plików cookies przez
      naszą stronę internetową poprzez odpowiednie ustawienie przeglądarki internetowej, z której
      korzysta i tym samym może na stałe sprzeciwić się zapisywaniu plików cookies. Ponadto zapisane
      już pliki cookies mogą zostać usunięte w każdym czasie za pomocą przeglądarki internetowej
      albo innych oprogramowań. Jest to możliwe we wszystkich powszechnie znanych przeglądarkach
      internetowych. Dezaktywowanie instalacji plików cookies w przeglądarce internetowej, z której
      korzysta osoba, której dane dotyczą, może spowodować, że w pewnych okolicznościach nie
      wszystkie funkcje naszej strony internetowej będą w pełni działać.
    </p>

    <h4>4. Zbieranie danych i informacji o charakterze ogólnym.</h4>
    <p>
      Strona internetowa Octoboards utrwala z każdym wywołaniem strony internetowej przez osobę,
      której dane dotyczą, lub przez system automatyczny szereg danych oraz informacji ogólnych.
      Wskazane dane i informacje ogólne są przechowywane w rejestrze zdarzeń (po ang. "log files”) w
      serwerze. Utrwalone mogą zostać: (1) używane typy i wersje przeglądarek (2) system operacyjny
      używany przez system dostępu (3) strona internetowa, z której system dostępu odsyła na naszą
      stronę internetową (tak zwane hiperłącze, po ang. "referrer”), (4) podstrony internetowe, do
      których kieruje system dostępu na naszej stronie internetowej, (5) data oraz godzina wejścia
      na stronę internetową, (6) adres protokołu internetowego (adres IP), (7) dostawcę usług
      internetowych systemu dostępu oraz (8) pozostałe podobne dane i informacje, które służą
      ochronie w przypadku ataków na nasze systemy technologii informatycznej.
    </p>

    <p>
      Przy używaniu tych ogólnych danych i informacji Octoboards nie wyciąga żadnych wniosków na
      temat osoby, której dane dotyczą. Informacje te są raczej potrzebne w celu: (1) poprawnego
      dostarczania treści naszej strony internetowej, (2) zoptymalizowania treści naszej strony
      internetowej oraz jej reklamy, (3) zapewnienia trwałej funkcjonalności naszym systemom
      technologii informatycznej oraz jakości technicznej naszej stronie internetowej, (4)
      udostępnienia koniecznych informacji potrzebnych do ścigania karnego organom ścigania w
      przypadku ataku cybernetycznego. Niniejsze dane i informacje, zebrane w sposób anonimowy,
      poddawane są zatem przez Octoboards analizie statystycznej, ponadto działania te mają na celu
      zwiększyć ochronę i bezpieczeństwo danych na naszej stronie, aby zagwarantować optymalny
      poziom ochrony przetwarzanych przez nas danych osobowych. Anonimowe dane z rejestru zdarzeń
      serwera (po ang. "server log files”) są przechowywane oddzielnie od wszystkich danych
      osobowych podanych przez osobę, której dane dotyczą.
    </p>

    <h4>5. Rejestracja na naszej stronie internetowej.</h4>
    <p>
      Na stronie internetowej administratora istnieje możliwość samodzielnej rejestracji z podaniem
      danych osobowych. Z panelu logowania, który stosowany jest przy rejestracji wynika, które dane
      osobowe zostaną przekazane administratorowi. Dane osobowe przekazane przez osobę, której dane
      dotyczą, są przechowywane wyłącznie do użytku wewnętrznego administratora i wykorzystywane do
      jego własnych celów.
    </p>

    <p>
      Z powodu rejestracji na stronie internetowej administratora przechowywuje się również adres IP
      nadany przez dostawcę usług internetowych (ISP) osobie, której dane dotyczą, oraz datę i
      godzinę rejestracji. Przechowywanie tych danych ma na celu zapobiegać nadużyciom w korzystaniu
      z naszych usług, a w razie potrzeby umożliwić wyjaśnienie popełnionych przestępstw.
      Przechowywanie tych danych jest zatem wymagane w celu zabezpieczenia interesu administratora.
      Co do zasady nie następuje przekazanie danych osobom trzecim, chyba że istnieje ustawowy
      obowiązek przekazania lub przekazanie ma służyć ściganiu karnym.
    </p>

    <p>
      Dane osobowe, podane dobrowolnie przy rejestracji, służą administratorowi do oferowania
      osobie, której dane dotyczą, treści oraz usług, które względu na charakter sprawy mogą być
      oferowane tylko użytkownikom zarejestrowanym. Osoby zarejestrowane mogą w każdym czasie
      zmienić zapisane dane osobowe albo żądać ich usunięcia w całości z bazy danych administratora.
    </p>

    <p>
      Na żądanie administrator udziela na bieżąco każdej osobie, której dane dotyczą, informacji o
      tym, jakie dane osobowe tej osoby są przechowywane. Dodatkowo na każde żądanie albo wskazanie
      osoby, której dane dotyczą administrator poprawia albo usuwa dane osobowe tej osoby, o ile nie
      sprzeciwiają się temu żadne ustawowe obowiązki przechowywania. Wszyscy współpracownicy
      administratora w związku z tym stoją do dyspozycji osoby, której dane dotyczą, jako osoby
      kontaktowe.
    </p>

    <h4>6. Możliwość nawiązania kontaktu przez stronę internetową. </h4>
    <p>
      Na podstawie przepisów prawa strona internetowa Octoboards zawiera informacje umożliwiające
      szybki elektroniczny kontakt z naszym przedsiębiorstwem, jak również bezpośrednią komunikację
      z nami, co obejmuje również ogólny adres tak zwanej poczty elektronicznej (adres e-mail).
      Nawiązanie kontaktu z administratorem za pomocą wiadomości e-mail albo za pomocą formularza
      kontaktowego powoduje, że dane osobowe przekazane przez osobę, której dane dotyczą, są
      automatycznie przechowywane. Dane osobowe, przekazane dobrowolnie administratorowi, są
      przechowywane do celów ich opracowywania albo w celu nawiązania kontaktu z osobą, której dane
      dotyczą. Wskazane wyżej dane osobowe nie są przekazywane osobom trzecim.
    </p>

    <h4>7. Rutynowe usuwanie oraz blokowanie danych osobowych.</h4>
    <p>
      Administrator przetwarza i przechowuje dane osobowe osoby, której dane dotyczą, tylko przez
      okres czasu niezbędny do osiągnięcia celu związanego z przechowywaniem albo jeśli jest to
      przewidziane przez ustawodawcę Unii Europejskiej albo przez innego ustawodawcę w
      obowiązujących przepisach prawa, którym podlega administrator danych.
    </p>

    <p>
      Odpadnie cel przechowywania danych lub upłynie przewidziany przez ustawodawcę Unii
      Europejskiej lub innego właściwego ustawodawcę termin przechowywania, dane osobowe są rutynowo
      i zgodnie z przepisami prawa blokowane albo usuwane.
    </p>

    <h4>8. Prawa osób, których dane dotyczą.</h4>
    <ul>
      <li>
        <h4>a) Prawo do uzyskania potwierdzenia.</h4>
        <p>
          Każdej osobie, której dane dotyczą, przysługuje, przyznane jej przez ustawodawcę Unii
          Europejskiej, prawo do uzyskania od administratora potwierdzenia, czy przetwarza się dane
          osobowe jej dotyczące. W przypadku chęci skorzystania z przysługującego prawa do uzyskania
          potwierdzenia, osoba, której dane dotyczą, może w tej sprawie zwrócić się w dowolnym
          momencie do współpracownika administratora.
        </p>
      </li>
      <li>
        <h4>b) Prawo do informacji.</h4>
        <p>
          Każda osoba, której dane osobowe są przetwarzane, ma przyznane jej przez ustawodawcę Unii
          Europejskiej prawo do bezpłatnego uzyskania od administratora informacji o przetwarzanych
          danych osobowych jej dotyczących oraz ma prawo otrzymać kopię tej informacji. W dodatku
          osoba taka jest uprawniona przez ustawodawcę Unii Europejskiej do uzyskania następujących
          informacji:
        </p>

        <ul>
          <li>cele przetwarzania;</li>
          <li>kategorie danych osobowych, które są przetwarzane;</li>
          <li>
            informacje o odbiorcach lub kategoriach odbiorców, którym dane osobowe zostały lub
            zostaną ujawnione, w szczególności o odbiorcach w państwach trzecich lub organizacjach
            międzynarodowych;
          </li>
          <li>
            w miarę możliwości planowany okres przechowywania danych osobowych, a gdy nie jest to
            możliwe, kryteria ustalania tego okresu;
          </li>
          <li>
            informacje o prawie do żądania od administratora sprostowania, usunięcia lub
            ograniczenia przetwarzania danych osobowych dotyczącego osoby, której dane dotyczą, oraz
            do wniesienia sprzeciwu wobec takiego przetwarzania;
          </li>
          <li>informacje o prawie wniesienia skargi do organu nadzorczego;</li>
          <li>
            jeżeli dane osobowe nie zostały zebrane od osoby, której dane dotyczą: wszelkie dostępne
            informacje o ich źródle;
          </li>
          <li>
            informacje o zautomatyzowanym podejmowaniu decyzji, w tym o profilowaniu, o którym mowa
            w art. 22 ust. 1 i 4 RODO oraz – przynajmniej w tych przypadkach – istotne informacje o
            zasadach ich podejmowania, a także o znaczeniu i przewidywanych konsekwencjach takiego
            przetwarzania dla osoby, której dane dotyczą;
          </li>
        </ul>
        <p>
          dodatkowo osobie, której dane dotyczą, przysługuje prawo informacji o tym, czy dane
          osobowe zostały przekazane do państwa trzeciego lub do organizacji międzynarodowej. Jeśli
          taka sytuacja zajdzie to osoba, której dane dotyczą, ma prawo otrzymać informację o
          odpowiednich zabezpieczeniach związanych z przekazaniem;
        </p>

        <p>
          jeśli osoba, której dane dotyczą, chciałaby skorzystać z przysługującego jej prawa do
          uzyskania informacji, może w każdym dowolnym momencie zwrócić się w tej sprawie do
          współpracownika administratora;
        </p>
      </li>
      <li>
        <h4>c) Prawo do sprostowania danych.</h4>
        <p>
          Każda osoba, której dane osobowe są przetwarzane, ma przyznane jej przez ustawodawcę Unii
          Europejskiej prawo żądania od administratora niezwłocznego sprostowania dotyczących jej
          nieprawidłowych danych osobowych. Dodatkowo osobie, której dane dotyczą, przysługuje prawo
          żądania, z uwzględnieniem celów przetwarzania, uzupełnienia niekompletnych danych
          osobowych – w tym poprzez przedstawienie dodatkowego oświadczenia.
        </p>

        <p>
          Jeśli osoba, której dane dotyczą, chciałaby skorzystać z przysługującego jej prawa żądania
          do sprostowania danych, może w każdym dowolnym momencie zwrócić się w tej sprawie do
          współpracownika administratora.
        </p>
      </li>
      <li>
        <h4>d) Prawo do usunięcia danych ("prawo do bycia zapomnianym”).</h4>
        <p>
          Każda osoba, które dane osobowe są przetwarzane, ma przyznane jej przez ustawodawcę Unii
          Europejskiej prawo żądania niezwłocznego usunięcia dotyczących jej danych osobowych,
          jeżeli zachodzi jedna z następujących okoliczności, a przetwarzanie tych danych nie jest
          wymagane:
        </p>

        <ul>
          <li>
            dane osobowe zostały zebrane w takich celach lub w inny sposób przetwarzane, dla których
            nie są już niezbędne;
          </li>
          <li>
            osoba, której dane dotyczą, cofnęła zgodę, na której opiera się przetwarzanie zgodnie z
            art. 6 ust. 1 lit. a) RODO lub art. 9 ust. 2 lit. a) RODO, i nie ma innej podstawy
            prawnej przetwarzania;
          </li>
          <li>
            osoba, której dane dotyczą, wnosi sprzeciw na mocy art. 21 ust. 1 RODO wobec
            przetwarzania i nie występują nadrzędne prawnie uzasadnione podstawy przetwarzania lub
            osoba, której dane dotyczą, wnosi sprzeciw na mocy art. 21 ust. 2 RODO wobec
            przetwarzania;
          </li>
          <li>dane osobowe były przetwarzane niezgodnie z prawem;</li>
          <li>
            dane osobowe muszą zostać usunięte w celu wywiązania się z obowiązku prawnego
            przewidzianego w prawie Unii lub prawie państwa członkowskiego, któremu podlega
            administrator;
          </li>
          <li>
            dane osobowe zostały zebrane w związku z oferowaniem usług społeczeństwa informacyjnego,
            o których mowa w art. 8 ust. 1. RODO;
          </li>
        </ul>
        <p>
          Jeśli zachodzi jedna z powyższych okoliczności, a dana osoba chciałaby żądać usunięcia
          danych osobowych, które są zapisane w Octoboards, może w tej sprawie zwrócić się w każdym
          czasie do współpracownika administratora. Współpracownik Octoboards zarządzi, że żądanie
          usunięcia danych osobowych zostanie wykonane niezwłocznie.
        </p>

        <p>
          Jeśli dane osobowe zostały przez Octoboards upublicznione, a nasze przedsiębiorstwo jako
          administrator ma obowiązek usunąć te dane osobowe zgodnie z art. 17 ust. 1 RODO, to w
          takiej sytuacji nasz Octoboards, przy uwzględnieniu dostępnej technologii i kosztów
          realizacji, podejmuje rozsądne działania, w tym środki techniczne, żeby poinformować
          innych administratorów przetwarzających te dane osobowe o tym, że osoba, której dane
          dotyczą, zażądała usunięcia przez nich wszelkich linków do tych danych, kopie tych danych
          osobowych lub ich replikacje, o ile nie zachodzi obowiązek ich przetwarzania.
          Współpracownik Octoboards zleci podjęcie niezbędnych działań w danym przypadku.
        </p>
      </li>
      <li>
        <h4>e) Prawo do ograniczenia przetwarzania.</h4>
        <p>
          Każda osoba, której dane osobowe są przetwarzane, ma przyznane jej przez ustawodawcę Unii
          Europejskiej prawo żądania ograniczenia przetwarzania w następujących przypadkach:
        </p>

        <ul>
          <li>
            kwestionuje się prawidłowość danych osobowych przez osobę, której dane dotyczą - na
            okres pozwalający administratorowi sprawdzić prawidłowość tych danych;
          </li>
          <li>
            przetwarzanie jest niezgodne z prawem, a osoba, której dane dotyczą, sprzeciwia się
            usunięciu danych osobowych, żądając w zamian ograniczenia ich wykorzystywania;
          </li>
          <li>
            administrator nie potrzebuje już danych osobowych do celów przetwarzania, ale są one
            potrzebne osobie, której dane dotyczą, do ustalenia, dochodzenia lub obrony roszczeń;
          </li>
          <li>
            osoba, której dane dotyczą, wniosła sprzeciw na mocy art. 21 ust. 1 RODO wobec
            przetwarzania i nie stwierdzono jeszcze, czy prawnie uzasadnione podstawy po stronie
            administratora są nadrzędne wobec podstaw sprzeciwu osoby, której dane dotyczą;
          </li>
        </ul>
        <p>
          Jeśli jedna z wyżej wymienionych przesłanek zachodzi i osoba, której dane dotyczą,
          chciałaby żądać ograniczenia przetwarzania danych osobowych, które są zapisane w
          Octoboards, może w tej sprawie zwrócić się w każdym czasie do współpracownika
          administratora. Współpracownik Octoboards zarządzi ograniczenie przetwarzania danych.
        </p>
      </li>
      <li>
        <h4>f) Prawo do przenoszenia danych. </h4>
        <p>
          Każda osoba, której dane osobowe są przetwarzane, ma przyznane jej przez ustawodawcę Unii
          Europejskiej prawo otrzymać w ustrukturyzowanym, powszechnie używanym formacie nadającym
          się do odczytu maszynowego dane osobowe jej dotyczące, które zostały przez nią dostarczone
          administratorowi. Poza tym ma ona prawo przesłać te dane osobowe innemu administratorowi
          bez przeszkód ze strony administratora, któremu dostarczono te dane osobowe, jeżeli
          przetwarzanie odbywa się na podstawie zgody w myśl art. 6 ust. 1 lit. a) RODO lub art. 9
          ust. 2 lit. a) RODO lub na podstawie umowy w myśl art. 6 ust. 1 lit. b) RODO oraz
          przetwarzanie odbywa się w sposób zautomatyzowany, pod warunkiem, że przetwarzanie nie
          jest konieczne do wykonania zadania realizowanego w interesie publicznym lub w ramach
          sprawowania władzy publicznej powierzonej administratorowi.
        </p>

        <p>
          Wykonując prawo do przenoszenia danych zgodnie z art. 20 ust. 1 RODO osoba, której dane
          dotyczą, ma również prawo żądania, by dane osobowe zostały przesłane przez administratora
          bezpośrednio innemu administratorowi, o ile jest to technicznie możliwe i tak dalece, jak
          nie narusza to praw i wolności osób trzecich.
        </p>

        <p>
          W celu skorzystania z prawa do przenoszenia danych, osoba, której dane dotyczą, może w
          każdym czasie zwrócić się do współpracownika Octoboards.
        </p>
      </li>
      <li>
        <h4>g) Prawo do sprzeciwu.</h4>
        <p>
          Każda osoba, której dane osobowe są przetwarzane ma przyznane jej przez ustawodawcę Unii
          Europejskiej prawo w dowolnym momencie wnieść sprzeciw - z przyczyn związanych z jej
          szczególną sytuacją – wobec przetwarzania dotyczących jej danych osobowych na podstawie
          art. 6 ust. 1 lit. e) lub f) RODO. Dotyczy to również profilowania na podstawie tych
          przepisów.
        </p>

        <p>
          W przypadku wniesienia sprzeciwu Octoboards nie będzie więcej przetwarzać tych danych
          osobowych, chyba że może wykazać istnienie ważnych prawnie uzasadnionych podstaw do
          przetwarzania, nadrzędnych wobec interesów, praw i wolności osoby, której dane dotyczą,
          lub przetwarzanie służy do ustalenia, dochodzenia lub obrony roszczeń.
        </p>

        <p>
          Jeżeli Octoboards przetwarza dane osobowe na potrzeby marketingu bezpośredniego, osoba,
          której dane dotyczą, ma prawo w dowolnym momencie wnieść sprzeciw wobec przetwarzania
          dotyczących jej danych osobowych na potrzeby takiego marketingu, w tym profilowania, w
          zakresie, w jakim przetwarzanie jest związane z takim marketingiem bezpośrednim. Jeżeli
          osoba, której dane dotyczą, sprzeciwia się przetwarzaniu danych do celów marketingu
          bezpośredniego przez Octoboards, to w takiej sytuacji Octoboards nie będzie już
          przetwarzać danych osobowych do tych celów.
        </p>

        <p>
          W przypadku przetwarzania danych osobowych przez Octoboards do celów badań naukowych lub
          historycznych lub do celów statystycznych na mocy art. 89 ust. 1 RODO, osoba, której dane
          dotyczą, ma prawo wnieść sprzeciw – z przyczyn związanych z jej szczególną sytuacją –
          wobec przetwarzania dotyczących jej danych osobowych, chyba że przetwarzanie jest
          niezbędne do wykonania zadania realizowanego w interesie publicznym.
        </p>

        <p>
          W celu realizacji prawa do wniesienia sprzeciwu osoba, której dane dotyczą, może zwrócić
          się bezpośrednio do współpracownika Octoboards lub do innego współpracownika. Dodatkowo
          osobie, której dane dotyczą, przysługuje możliwość wniesienia sprzeciwu za pośrednictwem
          zautomatyzowanych środków wykorzystujących specyfikacje techniczne w związku z
          korzystaniem z usług społeczeństwa informacyjnego i bez uszczerbku dla dyrektywy
          2002/58/WE.
        </p>
      </li>
      <li>
        <h4>
          h) Zautomatyzowane podejmowanie decyzji w indywidualnych przypadkach, w tym profilowanie.
        </h4>
        <p>
          Każda osoba, której dane osobowe są przetwarzane, ma przyznane jej przez ustawodawcę Unii
          Europejskiej prawo do tego, by nie podlegać decyzji, która opiera się wyłącznie na
          zautomatyzowanym przetwarzaniu – w tym profilowaniu – i która wywołuje wobec tej osoby
          skutki prawne lub w podobny sposób na nią wpływa, chyba że decyzja ta (1) jest niezbędna
          do zawarcia lub wykonania umowy między osobą, której dane dotyczą, a administratorem, lub
          (2) jest dozwolona prawem Unii lub prawem państwa członkowskiego, któremu podlega
          administrator i które przewiduje właściwe środki ochrony praw, wolności i prawnie
          uzasadnionych interesów osoby, której dane dotyczą lub (3) opiera się na wyraźnej zgodzie
          osoby, której dane dotyczą.
        </p>

        <p>
          W przypadku, gdy (1) decyzja jest niezbędna do zawarcia lub wykonania umowy między osobą,
          której dane dotyczą, a administratorem lub (2) opiera się na wyraźnej zgodzie osoby,
          której dane dotyczą, Octoboards wdraża właściwe środki ochrony praw, wolności i prawnie
          uzasadnionych interesów osoby, której dane dotyczą, a co najmniej prawa do uzyskania
          interwencji ludzkiej ze strony administratora, do wyrażenia własnego stanowiska i do
          zakwestionowania tej decyzji.
        </p>

        <p>
          W przypadku, gdy osoba, której prawa dotyczą, chciałaby dochodzić praw w odniesieniu do
          decyzji wydanych w oparciu o zautomatyzowane przetwarzanie, może się ona w tej sprawie
          zwrócić w każdym czasie do współpracownika administratora.
        </p>
      </li>
      <li>
        <h4>h) Prawo do wycofania zgody na przetwarzanie danych osobowych. </h4>
        <p>
          Każda osoba, której dane osobowe są przetwarzane, ma przyznane jej przez ustawodawcę Unii
          Europejskiej prawo do wycofania zgody w dowolnym momencie.
        </p>

        <p>
          Jeśli osoba, której dane dotyczą, chciałaby skorzystać z prawa do wycofania zgody, może
          się ona w każdej chwili w tej sprawie zwrócić do współpracownika administratora.
        </p>
      </li>
    </ul>
    <h4>
      9. Postanowienia dotyczące ochrony danych w zakresie zastosowania oraz korzystania z Google
      Analytics (z funkcją anonimizacji).
    </h4>
    <p>
      Na niniejszej stronie internetowej administrator zintegrował komponent Google Analytics (z
      funkcją anonimizacji). Google Analytics to usługa analityki internetowej. Analityka
      internetowa to zbieranie, przetwarzanie i analiza danych dotyczących zachowania osób
      odwiedzających strony internetowe. Usługa analityki internetowej zbiera między innymi dane o
      tym, z której strony internetowej osoba, której dane dotyczą, dostała się na inną stronę
      internetową (tzw. po ang. "referrer”), do których podstron danej witryny internetowej uzyskano
      dostęp lub jak często i przez jaki okres czasu była wyświetlana dana podstrona. Analityka
      internetowa jest używana głównie do optymalizacji strony internetowej oraz do analizy kosztów
      i korzyści reklamy internetowej.
    </p>

    <p>
      Operatorem komponentu Google-Analytics jest Google Inc., 1600 Amphitheatre Pkwy, Mountain
      View, CA 94043-1351, Stany Zjednoczone Ameryki.
    </p>

    <p>
      Administrator wykorzystuje dla analityki internetowej za pomocą Google Analytics rozszerzenie
      "_gat._anonymizeIp". Przy pomocy niniejszego rozszerzenia adres IP łącza internetowego osoby,
      której dane dotyczą, jest skracany oraz anonimizowany, jeśli dostęp do naszej strony
      internetowej pochodzi z państwa członkowskiego Unii Europejskiej albo z innego państwa
      będącego stroną Porozumienia o Europejskim Obszarze Gospodarczym.
    </p>

    <p>
      Komponent Google-Analytics jest używany w celu analizy ruchu użytkowników na naszej stronie
      internetowej. Google wykorzystuje uzyskane dane i informacje między innymi w celu dokonania
      oceny korzystania ze strony internetowej, w celu zestawienia raportów online, które pokazują
      działania podejmowane na naszych stronach internetowych, a także w celu świadczenia dalszych
      usług związanych z korzystaniem z naszej strony internetowej.
    </p>

    <p>
      Google Analytics umieszcza plik cookie w systemie technologii informatycznej osoby, której
      dane dotyczą. Kwestia, czym są pliki cookies, została już wyjaśniona powyżej. Poprzez zapisany
      plik cookie Google może analizować sposób korzystania z naszej strony internetowej. Przy
      każdym wywołaniu jednej z poszczególnych stron niniejszej witryny internetowej, obsługiwanej
      przez administratora, na której został zintegrowany komponent Google -Analytics, przeglądarka
      internetowa w systemie technologii informatycznej osoby, której dane dotyczą, automatycznie
      przesyła dane do Google przez odpowiedni komponent Google-Analytics do celów analizy online. W
      ramach tej technicznej procedury Google otrzymuje informacje o danych osobowych, takich jak
      adres IP osoby, której dane dotyczą, który służy Google między innymi do ustalenia, skąd
      pochodzą użytkownicy oraz ich kliknięcia, co pozwala na rozliczenie należnej prowizji.
    </p>

    <p>
      Za pomocą pliku cookie zostaną zapisane informacje osobowe, na przykład czas dostępu, miejsce,
      z którego uzyskano dostęp, częstotliwość wizyt odbytych na naszej stronie internetowej przez
      osobę, której dane dotyczą. Podczas każdej wizyty na naszej stronie internetowej wyżej
      wskazane dane osobowe, włącznie adres IP łącza internetowego używanego przez osobę, której
      dane dotyczą, są przekazywane do Google w Stanach Zjednoczonych Ameryki. Powyższe dane osobowe
      są przechowywane przez Google w Stanach Zjednoczonych Ameryki. Google może przekazać dane,
      zebrane w trakcie tej procedury technicznej, osobom trzecim pod pewnymi warunkami.
    </p>

    <p>
      Osoba, której dane dotyczą, może zapobiec umieszczaniu plików cookies za pośrednictwem naszej
      strony internetowej, jak już opisano powyżej, w każdym czasie za pomocą odpowiedniego
      ustawienia używanej przeglądarki internetowej i związku z tym może na stałe sprzeciwić się
      zapisywaniu plików cookies. Takie ustawienie używanej przeglądarki internetowej
      przeszkodziłoby również Google umieścić plik cookie w systemie technologii informatycznej
      osoby, której dane dotyczą. Ponadto zapisany już przez Google Analytics plik cookie może
      zostać usunięty w dowolnym momencie przy pomocy przeglądarki internetowej lub innych
      oprogramowań.
    </p>

    <p>
      W dodatku osoba, której dane dotyczą, może sprzeciwić się utrwalaniu danych pozyskanych przez
      Google Analytics przy korzystaniu z tejże strony internetowej, jak również przetwarzaniu tych
      danych przez Google, a także może temu zapobiec. W tym celu osoba, której dane dotyczą, musi
      pobrać i zainstalować dodatek do przeglądarki (po ang. "browser add-on”) znajdujący się pod
      linkiem https://tools.google.com/dlpage/gaoptout. Ten dodatek do przeglądarki informuje Google
      Analytics poprzez JavaScript, że nie mogą być przesyłane do Google Analytics żadne dane oraz
      informacje odnośnie wizyt na stronach internetowych. Instalacja dodatku do przeglądarki (po
      ang. "browser add-on”) traktowana jest przez Google jako wyrażenie sprzeciwu. Jeśli system
      technologii informatycznej osoby, której dane dotyczą, zostanie w późniejszym czasie usunięty,
      sformatowany lub na nowo zainstalowany, osoba, której dane dotyczą, musi ponownie zainstalować
      dodatek do przeglądarki (po ang. "browser add-on”), żeby dezaktywować Google Analytics. Jeśli
      dodatek do przeglądarki (po ang. "browser add-on”) został odinstalowany lub dezaktywowany
      przez osobę, której dane dotyczą, lub przez inną podległą jej osobę, można na nowo
      zainstalować lub ponownie aktywować dodatek do przeglądarki (po ang. "browse add-on”).
    </p>

    <p>
      Dalsze informacje oraz obowiązujące postanowienia dotyczące ochrony danych od Google można
      znaleźć na stronie https://www.google.de/intl/de/policies/privacy/ i na stronie
      http://www.google.com/analytics/terms/de.htmlGoogle Analytics jest objaśniony bardziej
      szczegółowo na stronie https://www.google.com/intl/de_de/analytics/.
    </p>

    <h4>10. Podstawa prawna przetwarzania.</h4>
    <p>
      Art. 6 ust. 1 litera a RODO służy naszemu przedsiębiorstwu jako podstawa prawna dla operacji
      przetwarzania, przy których uzyskujemy zgodę na określony cel przetwarzania. Jeśli
      przetwarzanie danych osobowych jest niezbędne do wykonania umowy, której stroną jest osoba,
      której dane dotyczą, jak na przykład ma to miejsce w operacjach przetwarzania niezbędnych do
      dostarczania towarów lub świadczenia jakiejkolwiek innej usługi lub do spełnienia świadczenia
      wzajemnego, przetwarzanie opiera się na art. 6 ust. 1 litera b RODO. To samo dotyczy takich
      operacji przetwarzania, które są niezbędne do podjęcia działań przed zawarciem umowy, jak w
      przypadku zapytań dotyczących produktów lub usług. Jeśli nasze przedsiębiorstwo podlega
      prawnemu obowiązkowi, który wymaga przetwarzania danych osobowych, jak na przykład w celu
      spełnienia obowiązków podatkowych, to podstawa prawna przetwarzania opiera się na art. 6 ust.
      1 litera c RODO. W rzadkich przypadkach przetwarzanie danych osobowych może być niezbędne w
      celu ochrony żywotnych interesów osoby, której dane dotyczą, lub innej osoby fizycznej.
      Przykładowo ma to miejsce w sytuacji, gdy odwiedzający nasz zakład zostałby ranny, a następnie
      jego nazwisko, wiek, dane ubezpieczenia zdrowotnego lub inne istotne dla życia informacje
      musiałyby zostać przekazane lekarzowi, szpitalowi lub innej osobie trzeciej. W takiej sytuacji
      przetwarzanie danych opierałoby się na podstawie art. 6 ust. 1 litera d RODO. Ostatecznie
      operacje przetwarzania mogą być oparte na podstawie art. 6 ust. 1 liera f RODO. Na tej
      podstawie prawnej opierają się operacje przetwarzania, które nie są objęte żadną z powyższych
      podstaw prawnych, jeśli przetwarzanie jest niezbędne do celów wynikających z prawnie
      uzasadnionych interesów realizowanych przez nasze przedsiębiorstwo lub przez stronę trzecią, o
      ile interesy, podstawowe prawa i wolności osoby, której dane dotyczą, nie mają charakteru
      nadrzędnego. Takie operacje przetwarzania są szczególnie dopuszczalne, ponieważ zostały
      wyraźnie wymienione przez prawodawcę Unii Europejskiej. Jego zdaniem prawnie uzasadniony
      interes może istnieć, gdy osoba, której dane dotyczą, jest klientem administratora (podstawa
      rozważań 47 zdanie 2 RODO).
    </p>

    <h4>
      11. Prawnie uzasadnione interesy w przetwarzaniu, które są przestrzegane przez administratora
      lub osobę trzecią.
    </h4>
    <p>
      Jeśli przetwarzanie danych osobowych opiera się na art. 6 ust. 1 litera f RODO to naszym
      prawnie uzasadnionym interesem jest prowadzenie przez nas działalności z korzyścią dla
      wszystkich naszych współpracowników oraz dla naszych udziałowców.
    </p>

    <h4>12. Czas, przez który dane osobowe będą przechowywane.</h4>
    <p>
      Kryterium dla okresu przechowywania danych osobowych jest odpowiedni ustawowy termin
      przechowywania. Po upływie tego terminu odpowiednie dane są rutynowo usuwane, o ile nie są one
      konieczne do wykonania lub zawarcia umowy.
    </p>

    <h4>
      13. Przepisy prawne lub umowne dotyczące podania danych osobowych; Konieczność zawarcia umowy;
      Obowiązek osoby, której dane dotyczą do podania danych osobowych; Ewentualne konsekwencje nie
      podania danych.
    </h4>
    <p>
      Niniejszym wskazujemy Państwu, iż obowiązek podania danych osobowych jest w części
      przewidziany ustawą (np. przepisy podatkowe) lub może wynikać z ustaleń umownych (takich jak
      dane kontrahenta). Czasami może być konieczne zawarcie umowy, a osoba, której dane dotyczą,
      przekazuje nam w tym celu dane osobowe, które w rezultacie muszą być przez nas przetwarzane.
      Przykładowo osoba, której dane dotyczą, jest zobowiązana podać nam dane osobowe, kiedy nasze
      przedsiębiorstwo zawiera z nią umowę. Nie podanie danych osobowych skutkowałoby tym, że umowa
      z daną osobą nie mogłaby zostać zawarta. Przed podaniem danych osobowych przez daną osobę,
      osoba ta musi się zwrócić do naszego współpracownika. W danym przypadku nasz współpracownik
      wyjaśnia osobie, której dane dotyczą, czy podanie przez nią danych osobowych przewidziane jest
      ustawą czy umową lub czy podanie przez nią danych jest konieczne w celu zawarcia umowy lub czy
      istnieje obowiązek podania danych osobowych, a także jakie są ewentualne konsekwencje
      niepodania przez nią danych osobowych.
    </p>

    <h4>14. Istnienie automatycznego podejmowania decyzji.</h4>
    <p>
      Jako świadome swojej odpowiedzialności przedsiębiorstwo rezygnujemy z automatycznego
      podejmowania decyzji lub profilowania.
    </p>

    <p>
      Developed by the specialists for <a href="https://willing-able.com/">LegalTech</a> at Willing
      & Able that also developed the system for
      <a href="https://abletotrain.com/">gdpr certification course</a>. The legal texts contained in
      our privacy policy generator have been provided and published by
      <a href="https://dg-datenschutz.de/">Prof. Dr. h.c. Heiko Jonny Maniero</a> from the German
      Association for Data Protection and
      <a href="https://www.wbs-law.de/" rel="nofollow">
        Christian Solmecke
      </a>
      from WBS law.
    </p>
  </>
);
