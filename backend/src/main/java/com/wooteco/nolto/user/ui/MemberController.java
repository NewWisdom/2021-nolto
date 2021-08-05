package com.wooteco.nolto.user.ui;

import com.wooteco.nolto.auth.MemberAuthenticationPrincipal;
import com.wooteco.nolto.auth.ValidTokenRequired;
import com.wooteco.nolto.user.application.UserService;
import com.wooteco.nolto.user.domain.User;
import com.wooteco.nolto.user.ui.dto.MemberHistoryResponse;
import com.wooteco.nolto.user.ui.dto.MemberResponse;
import com.wooteco.nolto.user.ui.dto.NicknameValidationResponse;
import com.wooteco.nolto.user.ui.dto.ProfileRequest;
import com.wooteco.nolto.user.ui.dto.ProfileResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequestMapping("/members")
@AllArgsConstructor
public class UserController {

    private final UserService userService;

    @ValidTokenRequired
    @GetMapping("/me")
    public ResponseEntity<MemberResponse> findMemberOfMine(@MemberAuthenticationPrincipal User user) {
        // TODO user의 notifications 수 구하는 로직 필요, user안에서 notifications 가지고 있게 할것인과
        return ResponseEntity.ok(MemberResponse.of(user));
    }

    @ValidTokenRequired
    @GetMapping("/me/history")
    public ResponseEntity<MemberHistoryResponse> findHistory(@MemberAuthenticationPrincipal User user) {
        MemberHistoryResponse memberHistoryResponse = userService.findHistory(user);
        return ResponseEntity.ok(memberHistoryResponse);
    }

    @ValidTokenRequired
    @GetMapping("/me/profile/validation")
    public ResponseEntity<NicknameValidationResponse> validateDuplicatedNickname(@MemberAuthenticationPrincipal User user,
                                                                                 @RequestParam String nickname) {
        NicknameValidationResponse response = userService.validateDuplicated(nickname);
        return ResponseEntity.ok(response);
    }

    @ValidTokenRequired
    @GetMapping("/me/profile")
    public ResponseEntity<ProfileResponse> findProfileOfMine(@MemberAuthenticationPrincipal User user) {
        ProfileResponse response = userService.findProfile(user);
        return ResponseEntity.ok(response);
    }

    @ValidTokenRequired
    @PutMapping("/me/profile")
    public ResponseEntity<ProfileResponse> updateProfileOfMine(@MemberAuthenticationPrincipal User user, @Valid @ModelAttribute ProfileRequest profileRequest) {
        ProfileResponse response = userService.updateProfile(user, profileRequest);
        return ResponseEntity.ok(response);
    }
}